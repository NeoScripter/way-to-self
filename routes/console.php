<?php

use App\Models\User;
use App\Notifications\SendBackupNotification;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
//     $quote = Inspiring::quote();
//     $this->comment($quote);
//     Log::info("Inspire command ran: $quote");
// })->purpose('Display an inspiring quote')->everyMinute();

Schedule::command('model:prune')->weekly();
Schedule::command('logs:clear')->monthly();

Artisan::command('backup_database', function (): void {
    $username = config('database.connections.mysql.username');
    $database = config('database.connections.mysql.database');
    $password = config('database.connections.mysql.password');
    $path = storage_path('app/private/backup.sql');

    exec("mysqldump -u {$username} --password={$password} {$database} > {$path} --no-tablespaces");

    $gzdata = gzencode(file_get_contents($path));
    file_put_contents("{$path}.gz", $gzdata);

    if (file_exists($path)) {
        unlink($path);
    }

    $user = User::where('email', 'sange0337@gmail.com')->first();

    if ($user) {
        $user->notify(new SendBackupNotification("{$path}.gz"));
    }

    $this->comment('db successfully backed up');
})->purpose('Backup mysql database');


// Extend user's subscription
