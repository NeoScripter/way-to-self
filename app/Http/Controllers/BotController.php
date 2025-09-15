<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BotService;
use Telegram\Bot\Api;

class BotController extends Controller
{
    protected $botService;

    public function __construct(Api $telegram)
    {
        $this->botService = new BotService($telegram);
    }

    public function webhook(Request $request)
    {
        $update = app(Api::class)->getWebhookUpdate();
        $this->botService->handleUpdate($update);

        return response('ok', 200);
    }
}
