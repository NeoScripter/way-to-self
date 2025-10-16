<?php

namespace App\Services;

use App\Models\Tier;
use App\Models\User;
use App\Support\TelegramText;
use Carbon\Carbon;
use Telegram\Bot\Api;
use Illuminate\Support\Str;
use AhoCorasick\MultiStringMatcher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class BotService
{
    protected $telegram;
    protected MultiStringMatcher $matcher;

    public function __construct(Api $telegram, MultiStringMatcher $matcher)
    {
        $this->telegram = $telegram;
        $this->matcher  = $matcher;
    }

    public function handleUpdate($update)
    {
        try {
            if ($update->has('message') && $update->getMessage()->has('new_chat_members')) {
                $this->handleNewMembers($update->getMessage());
            } elseif ($update->has('message')) {
                $this->handleMessage($update->getMessage());
            }
        } catch (Throwable $e) {
            Log::error('Error handling update', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        }
    }

    protected function handleMessage($message)
    {
        try {
            $chatId = $message->getChat()->getId();
            $text   = $message->getText() ?? '';
            $from   = $message->getFrom();

            if (! $from) {
                return;
            }

            $userId   = $from->getId();
            $username = $from->getUsername();

            $user = $this->ensureUserIsValid($chatId, $userId, $username);
            if (! $user) {
                return;
            }

            if ($this->matcher->searchIn($text)) {
                try {
                    $this->telegram->deleteMessage([
                        'chat_id'    => $chatId,
                        'message_id' => $message->getMessageId(),
                    ]);
                    $this->handleUserWarning($user, $chatId, $userId);
                } catch (Throwable $e) {
                    Log::error('Error deleting message or warning user', [
                        'chat_id' => $chatId,
                        'message_id' => $message->getMessageId(),
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        } catch (Throwable $e) {
            Log::error('Error in handleMessage', ['error' => $e->getMessage()]);
        }
    }

    protected function handleUserWarning(User $user, int $chatId, int $userId)
    {
        try {
            $tier = $user->tiers()->where('telegram_chat_id', $chatId)->first();
            if (! $tier || ! $tier->pivot) {
                Log::warning('Tier or pivot missing for user warning', ['user_id' => $userId]);
                return;
            }

            $currentCount = $tier->pivot->warning_count ?? 0;

            try {
                if ($currentCount >= 5) {
                    $this->telegram->sendMessage([
                        'chat_id' => $chatId,
                        'text'    => "Данный пользователь был перманентно заблокирован за нарушения правил группы",
                    ]);

                    // $this->telegram->banChatMember([
                    //     'chat_id' => $chatId,
                    //     'user_id' => $userId,
                    //     'banned_until_date' => 0,
                    // ]);
                } elseif ($currentCount === 2) {
                    $this->telegram->sendMessage([
                        'chat_id' => $chatId,
                        'text'    => "Данный пользователь был временно заблокирован за нарушения правил группы",
                    ]);

                    // $this->telegram->banChatMember([
                    //     'chat_id' => $chatId,
                    //     'user_id' => $userId,
                    //     'banned_until_date' => now()->addDays(7)->timestamp,
                    // ]);
                } else {
                    $this->telegram->sendMessage([
                        'chat_id' => $chatId,
                        'text' =>
                        TelegramText::sanitizeForMarkdown(
                            "Данное сообщение было удалено в связи с использованием ненормативной лексики.\n\n" .
                                "Напоминаю, что использование ненормативной лексики в чате запрещено правилами группы.\n\n" .
                                "При повторном нарушении вы будете временно заблокированы. " .
                                "При дальнейшем нарушении — перманентно."
                        ),
                        'parse_mode' => 'MarkdownV2',
                    ]);
                }
            } catch (Throwable $e) {
                Log::error('Telegram error in handleUserWarning', [
                    'chat_id' => $chatId,
                    'user_id' => $userId,
                    'error' => $e->getMessage(),
                ]);
            }

            try {
                DB::table('tier_user')
                    ->where('user_id', $user->id)
                    ->where('tier_id', $tier->id)
                    ->increment('warning_count');
            } catch (Throwable $e) {
                Log::error('DB error incrementing warning_count', ['error' => $e->getMessage()]);
            }
        } catch (Throwable $e) {
            Log::error('Error in handleUserWarning', ['error' => $e->getMessage()]);
        }
    }

    protected function handleNewMembers($message)
    {
        try {
            $chatId     = $message->getChat()->getId();
            $newMembers = $message->getNewChatMembers();

            foreach ($newMembers as $member) {
                try {
                    $user = $this->ensureUserIsValid(
                        $chatId,
                        $member->getId(),
                        $member->getUsername()
                    );

                    if (! $user) {
                        continue;
                    }

                    $tier = $user->tiers()->where('telegram_chat_id', $chatId)->first();
                    if (! $tier) {
                        continue;
                    }

                    $greeting = TelegramText::sanitizeForMarkdown($tier->tg_greet_html ?? '');
                    $fullName = trim($user->name . ' ' . $user->surname);

                    $this->telegram->sendMessage([
                        'chat_id'    => $chatId,
                        'text'       => $fullName . $greeting,
                        'parse_mode' => 'MarkdownV2',
                    ]);
                } catch (Throwable $e) {
                    Log::error('Error greeting new member', [
                        'chat_id' => $chatId,
                        'member_id' => $member->getId(),
                        'error' => $e->getMessage(),
                    ]);
                }
            }
        } catch (Throwable $e) {
            Log::error('Error in handleNewMembers', ['error' => $e->getMessage()]);
        }
    }

    protected function ensureUserIsValid(int $chatId, int $userId, ?string $username): ?User
    {
        try {
            if (! $username) {
                $this->kickUser($chatId, $userId);
                return null;
            }

            $user = User::where('telegram', strtolower($username))->first();
            if (! $user) {
                $this->kickUser($chatId, $userId);
                return null;
            }

            $tier = $user->tiers()->where('telegram_chat_id', $chatId)->first();
            if (! $this->isUserSubscribed($tier)) {
                $this->kickUser($chatId, $userId);
                return null;
            }

            return $user;
        } catch (Throwable $e) {
            Log::error('Error in ensureUserIsValid', [
                'chat_id' => $chatId,
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    protected function kickUser(int $chatId, int $userId)
    {
        try {
            $this->telegram->banChatMember([
                'chat_id' => $chatId,
                'user_id' => $userId,
                'banned_until_date' => now()->addSeconds(10)->timestamp,
            ]);
        } catch (Throwable $e) {
            Log::error('Error kicking user', [
                'chat_id' => $chatId,
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);
        }
    }

    protected function isUserSubscribed(?Tier $tier): bool
    {
        try {
            return $tier && Carbon::parse($tier->pivot->expires_at ?? null)->isFuture();
        } catch (Throwable $e) {
            Log::error('Error checking subscription', ['error' => $e->getMessage()]);
            return false;
        }
    }
}
