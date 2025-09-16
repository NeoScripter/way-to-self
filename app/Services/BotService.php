<?php

namespace App\Services;

use App\Models\Tier;
use App\Models\User;
use App\Support\TelegramText;
use Carbon\Carbon;
use Telegram\Bot\Api;
use Illuminate\Support\Str;


class BotService
{
    protected $telegram;

    public function __construct(Api $telegram)
    {
        $this->telegram = $telegram;
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
        $chatId  = $message->getChat()->getId();
        $text    = $message->getText();
        $from    = $message->getFrom();
        $userId  = $from->getId();
        $username = $from->getUsername();

        $user = $this->ensureUserIsValid($chatId, $userId, $username);
        if (! $user) {
            return;
        }

        // Message filtering logic
        $forbidden = ['fox', 'box', 'brown', 'pet'];

        // Build one regex
        $pattern = '/(?<!\p{L})(?:' . implode('|', array_map('preg_quote', $forbidden)) . ')(?!\p{L})/iu';

        if (preg_match($pattern, $text)) {
            $text = 'Ваш текст содержит запрещенные слова';
        }
        $this->telegram->sendMessage([
            'chat_id' => $chatId,
            'text'    => "Вы написали: {$text}",
        ]);
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
        if (! $this->isUserSubscribed($user, $tier)) {
            $this->kickUser($chatId, $userId);
            return null;
        }

        return $user;
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
}
