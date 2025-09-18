<?php

namespace App\Services;

use App\Models\Tier;
use App\Models\User;
use App\Support\TelegramText;
use Carbon\Carbon;
use Telegram\Bot\Api;
use Illuminate\Support\Str;
use AhoCorasick\MultiStringMatcher;
use Illuminate\Support\Facades\Log;

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
        if ($update->has('message') && $update->getMessage()->has('new_chat_members')) {
            $this->handleNewMembers($update->getMessage());
        } else if ($update->has('message')) {
            $this->handleMessage($update->getMessage());
        }
    }

    protected function handleMessage($message)
    {
        $chatId = $message->getChat()->getId();
        $text   = $message->getText() ?? '';
        $from = $message->getFrom();
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
            } catch (\Throwable $e) {
                Log::error('Unexpected error deleting message', [
                    'chat_id' => $chatId,
                    'message_id' => $message->getMessageId(),
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }

    protected function handleUserWarning(User $user, int $chatId, int $userId)
    {
        $currentCount = $user->warning_count;

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
                TelegramText::sanitizeForMarkdown("Данное сообщение было удалено в связи с использованием ненормативной лексики.\n\n" .
                    "Напоминаю, что использование ненормативной лексики в чате запрещено правилами группы.\n\n" .
                    "При повторном нарушении вы будете временно заблокированы. " .
                    "При дальнейшем нарушении — перманентно."),
                'parse_mode' => 'MarkdownV2',
            ]);
        }
        $user->increment('warning_count');
    }

    protected function handleNewMembers($message)
    {
        $chatId     = $message->getChat()->getId();
        $newMembers = $message->getNewChatMembers();

        foreach ($newMembers as $member) {
            $user = $this->ensureUserIsValid(
                $chatId,
                $member->getId(),
                $member->getUsername()
            );

            if (! $user) {
                continue;
            }

            $tier = $user->tiers()->where('telegram_chat_id', $chatId)->first();
            $greeting = TelegramText::sanitizeForMarkdown($tier->tg_greet_html);
            $fullName = $user->name . ' ' . $user->surname;

            $this->telegram->sendMessage([
                'chat_id'    => $chatId,
                'text'       => $fullName . $greeting,
                'parse_mode' => 'MarkdownV2',
            ]);
        }
    }

    protected function ensureUserIsValid(int $chatId, int $userId, ?string $username): ?User
    {
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
    }

    protected function kickUser(int $chatId, int $userId)
    {
        $this->telegram->banChatMember([
            'chat_id' => $chatId,
            'user_id' => $userId,
            'banned_until_date' => now()->addSeconds(10)->timestamp,
        ]);
    }

    protected function isUserSubscribed(?Tier $tier): bool
    {
        return $tier && Carbon::parse($tier->pivot->expires_at)->isFuture();
    }
}
