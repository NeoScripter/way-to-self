<?php

use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
//     $quote = Inspiring::quote();
//     $this->comment($quote);
//     Log::info("Inspire command ran: $quote");
// })->purpose('Display an inspiring quote')->everyMinute();

Schedule::command('model:prune')->weekly();
Schedule::command('logs:clear')->monthly();


// Extend user's subscription
