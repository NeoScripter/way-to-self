<?php

use App\Http\Controllers\Account\SoulAudioController;
use App\Http\Controllers\Account\SoulController;
use App\Http\Controllers\Account\SoulPracticeController;
use App\Http\Controllers\Account\SoulSearchController;
use App\Http\Controllers\Account\SoulArticleController;
use App\Http\Controllers\Admin\Soul\ArticleController;
use App\Http\Controllers\Admin\Soul\AudioController;
use App\Http\Controllers\Admin\Soul\AudioFilterController;
use App\Http\Controllers\Admin\Soul\FAQController;
use App\Http\Controllers\Admin\Soul\PracticeController;
use App\Http\Controllers\Admin\Soul\PracticeFilterController;
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

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin/soul')->name('admin.soul.')->group(function () {

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

    Route::prefix('/filters/audios')->name('audios.filters.')->group(function () {
        Route::get('/', [AudioFilterController::class, 'index'])->name('index');
        Route::post('/store', [AudioFilterController::class, 'store'])->name('store');
        Route::post('/update/{title}', [AudioFilterController::class, 'update'])->name('update');
        Route::delete('/mass-destroy', [AudioFilterController::class, 'massDestroy'])->name('massDestroy');
        Route::delete('/{filter}', [AudioFilterController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/filters/practices')->name('practices.filters.')->group(function () {
        Route::get('/', [PracticeFilterController::class, 'index'])->name('index');
        Route::post('/store', [PracticeFilterController::class, 'store'])->name('store');
        Route::post('/update/{title}', [PracticeFilterController::class, 'update'])->name('update');
        Route::delete('/mass-destroy', [PracticeFilterController::class, 'massDestroy'])->name('massDestroy');
        Route::delete('/{filter}', [PracticeFilterController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/practices')->name('practices.')->group(function () {
        Route::get('/', [PracticeController::class, 'index'])->name('index');
        Route::post('/store', [PracticeController::class, 'store'])->name('store');
        Route::post('/{practice}', [PracticeController::class, 'update'])->name('update');
        Route::get('/create', [PracticeController::class, 'create'])->name('create');
        Route::get('/{practice}', [PracticeController::class, 'show'])->name('show');
        Route::delete('/{practice}', [PracticeController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/audios')->name('audios.')->group(function () {
        Route::get('/', [AudioController::class, 'index'])->name('index');
        Route::post('/store', [AudioController::class, 'store'])->name('store');
        Route::post('/{audio}', [AudioController::class, 'update'])->name('update');
        Route::get('/create', [AudioController::class, 'create'])->name('create');
        Route::get('/{audio}', [AudioController::class, 'show'])->name('show');
        Route::delete('/{audio}', [AudioController::class, 'destroy'])->name('destroy');
    });
});
