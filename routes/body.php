<?php

use App\Http\Controllers\Account\BodyArticleController;
use App\Http\Controllers\Account\BodyController;
use App\Http\Controllers\Account\BodyExerciseController;
use App\Http\Controllers\Account\BodyProgramController;
use App\Http\Controllers\Account\BodySearchController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'tier.access:body'])->prefix('account/body')->name('body.')->group(function () {

    Route::get('', [BodyController::class, 'index'])->name('index');
    Route::get('/articles', [BodyArticleController::class, 'index'])->name('articles');
    Route::get('/articles/{article}', [BodyArticleController::class, 'show'])->name('articles.show');
    Route::post('/articles/{id}/favorite', [BodyArticleController::class, 'update'])
        ->name('articles.favorite');

    Route::get('/exercises', [BodyExerciseController::class, 'index'])->name('exercises');
    Route::get('/exercises/{exercise}', [BodyExerciseController::class, 'show'])->name('exercises.show');
    Route::post('/exercises/{id}/favorite', [BodyExerciseController::class, 'update'])
        ->name('exercises.favorite');

    Route::get('/practices', [BodyProgramController::class, 'index'])->name('programs');
    Route::get('/programs/{program}', [BodyProgramController::class, 'show'])->name('programs.show');
    Route::post('/programs/{id}/favorite', [BodyProgramController::class, 'update'])
        ->name('programs.favorite');

    Route::get('/search', BodySearchController::class)->name('search');
});
