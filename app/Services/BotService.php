<?php

namespace App\Services;

use App\Models\Tier;
use App\Models\User;
use App\Support\TelegramText;
use Carbon\Carbon;
use Telegram\Bot\Api;

class BotService
{
    protected $telegram;

    public function __construct(Api $telegram)
    {
        $this->telegram = $telegram;
    }

    /**
     * Handle incoming update
     */
    public function handleUpdate($update)
    {
        if ($update->has('message') && $update->getMessage()->has('new_chat_members')) {
            $this->handleNewMembers($update->getMessage());
        } else if ($update->has('message')) {
            $this->handleMessage($update->getMessage());
        }
    }

    /**
     * Handle normal messages
     */
    protected function handleMessage($message)
    {
        $chatId = $message->getChat()->getId();
        $text   = $message->getText();

        // $from = $message->getFrom();
        // $username = $from ? $from->getUsername() : null;
        $this->telegram->sendMessage([
            'chat_id' => $chatId,
            'text'    => "Вы написали: {$text}",
        ]);
    }

    protected function isUserSubscribed(User $user, ?Tier $tier): bool
    {
        return $tier && Carbon::parse($tier->pivot->expires_at)->isFuture();
    }

    protected function isUserSigned(string $username): bool
    {
        return User::where('telegram', strtolower($username))
            ->exists();
    }

    protected function kickUser(int $chatId, int $userId)
    {
        // $this->telegram->sendMessage([
        //     'chat_id' => $chatId,
        //     'text'    => "Здравствуйте! У вас нет права находиться в данной группе",
        // ]);
        $this->telegram->banChatMember([
            'chat_id' => $chatId,
            'user_id' => $userId,
            'banned_until_date' => now()->addSeconds(10)->timestamp,
        ]);
    }

    /**
     * Handle new members joining
     */
    protected function handleNewMembers($message)
    {
        $chatId = $message->getChat()->getId();
        $newMembers = $message->getNewChatMembers();

        foreach ($newMembers as $member) {
            $username = $member->getUsername();

            if (! $this->isUserSigned($username)) {
                $this->kickUser($chatId, $member->getId());
                continue;
            }

            $user = User::where('telegram', strtolower($username))->first();
            $tier = $user->tiers()->where('telegram_chat_id', $chatId)->first();

            if (! $this->isUserSubscribed($user, $tier)) {
                $this->kickUser($chatId, $member->getId());
                continue;
            }

            $greeting = TelegramText::sanitizeForMarkdown(($tier->tg_greet_html));

            $user = User::where('telegram', strtolower($username))->first();
            $fullName = $user->name . ' ' . $user->surname;

            $this->telegram->sendMessage([
                'chat_id' => $chatId,
                'text'    => $fullName . $greeting,
                'parse_mode' => 'MarkdownV2',
            ]);
        }
    }
}
