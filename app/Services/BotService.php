<?php

namespace App\Services;

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
        if ($update->has('message')) {
            $this->handleMessage($update->getMessage());
        }

        if ($update->has('message') && $update->getMessage()->has('new_chat_members')) {
            $this->handleNewMembers($update->getMessage());
        }
    }

    /**
     * Handle normal messages
     */
    protected function handleMessage($message)
    {
        $chatId = $message->getChat()->getId();
        $text   = $message->getText();

        $this->telegram->sendMessage([
            'chat_id' => $chatId,
            'text'    => "Вы написали: {$text}",
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
            $username = $member->getUsername() ?: $member->getFirstName();
            $this->telegram->sendMessage([
                'chat_id' => $chatId,
                'text'    => "Hello {$username}! Welcome to our chat!",
            ]);
        }
    }
}
