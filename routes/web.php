<?php

use App\Http\Controllers\User\TierController;
use App\Http\Controllers\User\ArticleController;
use App\Http\Controllers\User\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::get('/shop', function () {
    abort(503);
})->name('shop');

Route::get('/tiers', [TierController::class, 'index'])->name('tiers.index');

Route::name('user.')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/article/{article}', [ArticleController::class, 'show'])->name('articles.show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
