<?php

use App\Http\Controllers\Account\BodyArticleController;
use App\Http\Controllers\Account\BodyController;
use App\Http\Controllers\Account\BodyExerciseController;
use App\Http\Controllers\Account\BodyProgramController;
use App\Http\Controllers\Account\BodySearchController;
use App\Http\Controllers\Admin\Body\ArticleController;
use App\Http\Controllers\Admin\Body\FAQController;
use App\Http\Controllers\Admin\Body\ExerciseFilterController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'banned', 'tier.access:body'])->prefix('account/body')->name('body.')->group(function () {

    Route::get('', [BodyController::class, 'index'])->name('index');
    Route::get('/articles', [BodyArticleController::class, 'index'])->name('articles');
    Route::get('/articles/{article}', [BodyArticleController::class, 'show'])->name('articles.show');
    Route::post('/articles/{id}/favorite', [BodyArticleController::class, 'update'])
        ->name('articles.favorite');

    Route::get('/exercises', [BodyExerciseController::class, 'index'])->name('exercises');
    Route::get('/exercises/{exercise}', [BodyExerciseController::class, 'show'])->name('exercises.show');
    Route::post('/exercises/{id}/favorite', [BodyExerciseController::class, 'update'])
        ->name('exercises.favorite');

    Route::get('/programs', [BodyProgramController::class, 'index'])->name('programs');
    Route::get('/programs/{program}', [BodyProgramController::class, 'show'])->name('programs.show');
    Route::post('/programs/{id}/favorite', [BodyProgramController::class, 'update'])
        ->name('programs.favorite');

    Route::get('/search', BodySearchController::class)->name('search');
});

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin/body')->name('admin.body.')->group(function () {

    Route::prefix('/faqs')->name('faqs.')->group(function () {
        Route::post('/store', [FAQController::class, 'store'])->name('store');
        Route::get('/', [FAQController::class, 'index'])->name('index');
        Route::post('/{faq}', [FAQController::class, 'update'])->name('update');
        Route::delete('/{faq}', [FAQController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/articles')->name('articles.')->group(function () {
        Route::get('/', [ArticleController::class, 'index'])->name('index');
        Route::post('/store', [ArticleController::class, 'store'])->name('store');
        Route::post('/{article}', [ArticleController::class, 'update'])->name('update');
        Route::get('/create', [ArticleController::class, 'create'])->name('create');
        Route::get('/{article}', [ArticleController::class, 'show'])->name('show');
        Route::delete('/{article}', [ArticleController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/exercise/filters')->name('exercise.filters.')->group(function () {
        Route::get('/', [ExerciseFilterController::class, 'index'])->name('index');
        Route::post('/store', [ExerciseFilterController::class, 'store'])->name('store');
        Route::post('/update/{title}', [ExerciseFilterController::class, 'update'])->name('update');
        Route::delete('/mass-destroy', [ExerciseFilterController::class, 'massDestroy'])->name('massDestroy');
        Route::delete('/{filter}', [ExerciseFilterController::class, 'destroy'])->name('destroy');
    });
});

