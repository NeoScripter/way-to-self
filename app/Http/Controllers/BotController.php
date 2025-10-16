<?php

namespace App\Http\Controllers;

use AhoCorasick\MultiStringMatcher;
use Illuminate\Http\Request;
use App\Services\BotService;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Api;

class BotController extends Controller
{
    protected $botService;

    public function __construct(Api $telegram, MultiStringMatcher $matcher)
    {
        $this->botService = new BotService($telegram, $matcher);
    }

    public function webhook(Request $request)
    {
        Log::info('Telegram webhook hit', [
            'headers' => $request->headers->all(),
            'body' => $request->all(),
        ]);

        $update = app(Api::class)->getWebhookUpdate();
        $this->botService->handleUpdate($update);

        return response('ok', 200);
    }
}
