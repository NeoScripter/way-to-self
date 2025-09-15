<?php

namespace App\Console\Commands;

use App\Services\BotService;
use Illuminate\Console\Command;
use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramPollCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'telegram:poll';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $offset = 0;
        $botService = app(BotService::class);

        $this->info("Starting Telegram polling... Press Ctrl+C to stop.");

        while (true) {
            $updates = Telegram::getUpdates([
                'offset' => $offset,
                'timeout' => 10,
            ]);

            foreach ($updates as $update) {
                $botService->handleUpdate($update);
                $offset = $update->getUpdateId() + 1;
            }

            usleep(500000); // 0.5s pause between polls
        }
    }
}
