<?php

use App\Http\Controllers\Account\SoulAudioController;
use App\Http\Controllers\Account\SoulController;
use App\Http\Controllers\Account\SoulPracticeController;
use App\Http\Controllers\Account\SoulSearchController;
use App\Http\Controllers\Account\SoulArticleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'banned', 'tier.access:soul'])->prefix('account/soul')->name('soul.')->group(function () {

    Route::get('', [SoulController::class, 'index'])->name('index');

    Route::get('/articles', [SoulArticleController::class, 'index'])->name('articles');
    Route::get('/articles/{article}', [SoulArticleController::class, 'show'])->name('articles.show');
    Route::post('/articles/{id}/favorite', [SoulArticleController::class, 'update'])
        ->name('articles.favorite');

    Route::get('/audios', [SoulAudioController::class, 'index'])->name('audios');
    Route::get('/audios/{audio}', [SoulAudioController::class, 'show'])->name('audios.show');
    Route::post('/audios/{id}/favorite', [SoulAudioController::class, 'update'])
        ->name('audios.favorite');

    Route::get('/practices', [SoulPracticeController::class, 'index'])->name('practices');
    Route::get('/practices/{practice}', [SoulPracticeController::class, 'show'])->name('practices.show');
    Route::post('/practices/{id}/favorite', [SoulPracticeController::class, 'update'])
        ->name('practices.favorite');

    Route::get('/search', SoulSearchController::class)->name('search');
});
