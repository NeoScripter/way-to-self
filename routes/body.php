<?php

use App\Http\Controllers\Account\BodyArticleController;
use App\Http\Controllers\Account\BodyController;
use App\Http\Controllers\Account\BodySearchController;
use App\Http\Controllers\Account\SoulAudioController;
use App\Http\Controllers\Account\SoulController;
use App\Http\Controllers\Account\SoulPracticeController;
use App\Http\Controllers\Account\SoulArticleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'tier.access:body'])->prefix('account/body')->name('body.')->group(function () {

    Route::get('', [BodyController::class, 'index'])->name('index');
    Route::get('/articles', [BodyArticleController::class, 'index'])->name('articles');
    Route::get('/articles/{article}', [BodyArticleController::class, 'show'])->name('articles.show');
    Route::post('/articles/{id}/favorite', [BodyArticleController::class, 'update'])
        ->name('articles.favorite');

    // Route::get('/audios', [SoulAudioController::class, 'index'])->name('audios');
    // Route::get('/audios/{audio}', [SoulAudioController::class, 'show'])->name('audios.show');
    // Route::post('/audios/{id}/favorite', [SoulAudioController::class, 'update'])
    //     ->name('audios.favorite');

    // Route::get('/practices', [SoulPracticeController::class, 'index'])->name('practices');
    // Route::get('/practices/{practice}', [SoulPracticeController::class, 'show'])->name('practices.show');
    // Route::post('/practices/{id}/favorite', [SoulPracticeController::class, 'update'])
    //     ->name('practices.favorite');

    Route::get('/search', BodySearchController::class)->name('search');
});
