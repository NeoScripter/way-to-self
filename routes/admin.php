<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEditorController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\PromoController;
use App\Http\Controllers\Settings\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
    Route::get('/profile', [AdminProfileController::class, 'show'])->name('profile');

    Route::prefix('/editors')->name('editors.')->middleware('role:admin')->group(function () {
        Route::get('/create', [AdminEditorController::class, 'create'])->name('create');
        Route::post('/store', [AdminEditorController::class, 'store'])->name('store');
        Route::get('/', [AdminEditorController::class, 'index'])->name('index');
        Route::get('/{user}', [AdminEditorController::class, 'show'])->name('show');
        Route::patch('/{user}', [AdminEditorController::class, 'update'])->name('update');
        Route::post('/{user}', [UserController::class, 'update'])->name('ban');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/users')->name('users.')->group(function () {
        Route::get('/', [AdminUserController::class, 'index'])->name('index')->withTrashed();
        Route::get('/{user}', [AdminUserController::class, 'show'])->name('show')->withTrashed();
        Route::patch('/{user}', [AdminUserController::class, 'update'])->name('update');
        Route::post('/{user}', [UserController::class, 'update'])->name('ban');
        Route::post('/restore/{user}', [UserController::class, 'restore'])->name('restore')->withTrashed();
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy')->withTrashed();
    });

    Route::prefix('/promos')->name('promos.')->group(function () {
        Route::get('/create', [PromoController::class, 'create'])->name('create');
        Route::post('/store', [PromoController::class, 'store'])->name('store');
        Route::get('/', [PromoController::class, 'index'])->name('index');
        Route::get('/{promo}', [PromoController::class, 'show'])->name('show');
        Route::patch('/{promo}', [PromoController::class, 'update'])->name('update');
        Route::patch('/toggle/{promo}', [PromoController::class, 'toggle'])->name('toggle');
        Route::delete('/', [PromoController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/plans')->name('plans.')->group(function () {
        Route::get('/create', [PlanController::class, 'create'])->name('create');
        Route::post('/store', [PlanController::class, 'store'])->name('store');
        Route::get('/', [PlanController::class, 'index'])->name('index');
        Route::get('/{plan}', [PlanController::class, 'show'])->name('show');
        Route::post('/{plan}', [PlanController::class, 'update'])->name('update');
        Route::patch('/toggle/{plan}', [PlanController::class, 'toggle'])->name('toggle');
        Route::delete('/{plan}', [PlanController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/articles')->name('news.articles.')->group(function () {
        Route::get('/create', [ArticleController::class, 'create'])->name('create');
        Route::post('/store', [ArticleController::class, 'store'])->name('store');
        Route::get('/', [ArticleController::class, 'index'])->name('index');
        Route::get('/{article}', [ArticleController::class, 'show'])->name('show');
        Route::post('/{article}', [ArticleController::class, 'update'])->name('update');
        Route::delete('/{article}', [ArticleController::class, 'destroy'])->name('destroy');
    });
});
