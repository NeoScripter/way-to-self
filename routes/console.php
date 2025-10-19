<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $quote = Inspiring::quote();
    $this->comment($quote);
    Log::info("Inspire command ran: $quote");
})->purpose('Display an inspiring quote')->everyMinute();

Schedule::command('model:prune')->weekly();

// Extend user's subsription
// Clear logs
