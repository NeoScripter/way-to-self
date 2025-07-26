<?php

use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\ArticleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::get('/article/{:id}', [ArticleController::class, 'show'])->name('user.article.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
