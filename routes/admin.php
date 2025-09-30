<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEditorController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\PromoController;
use App\Http\Controllers\Settings\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
    Route::get('/profile', [AdminProfileController::class, 'show'])->name('profile');


    Route::middleware('role:admin')->group(function () {
        Route::get('/editors/create', [AdminEditorController::class, 'create'])->name('editors.create');
        Route::post('/editors/store', [AdminEditorController::class, 'store'])->name('editors.store');
        Route::get('/editors', [AdminEditorController::class, 'index'])->name('editors.index');
        Route::get('/editors/{user}', [AdminEditorController::class, 'show'])->name('editors.show');
        Route::patch('/editors/{user}', [AdminEditorController::class, 'update'])->name('editors.update');
        Route::post('/editors/{user}', [UserController::class, 'update'])->name('editors.ban');
        Route::delete('/editors/{user}', [UserController::class, 'destroy'])->name('editors.destroy');
    });

    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index')->withTrashed();
    Route::get('/users/{user}', [AdminUserController::class, 'show'])->name('users.show')->withTrashed();
    Route::patch('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    Route::post('/users/{user}', [UserController::class, 'update'])->name('users.ban');
    Route::post('/users/restore/{user}', [UserController::class, 'restore'])->name('users.restore')->withTrashed();
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy')->withTrashed();


    Route::get('/promos/create', [PromoController::class, 'create'])->name('promos.create');
    Route::post('/promos/store', [PromoController::class, 'store'])->name('promos.store');
    Route::get('/promos', [PromoController::class, 'index'])->name('promos.index');
    Route::get('/promos/{promo}', [PromoController::class, 'show'])->name('promos.show');
    Route::patch('/promos/{promo}', [PromoController::class, 'update'])->name('promos.update');
    Route::patch('/promos/toggle/{promo}', [PromoController::class, 'toggle'])->name('promos.toggle');
    Route::delete('/promos', [PromoController::class, 'destroy'])->name('promos.destroy');


    Route::get('/plans/create', [PlanController::class, 'create'])->name('plans.create');
    Route::post('/plans/store', [PlanController::class, 'store'])->name('plans.store');
    Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');
    Route::get('/plans/{plan}', [PlanController::class, 'show'])->name('plans.show');
    Route::patch('/plans/{plan}', [PlanController::class, 'update'])->name('plans.update');
    Route::patch('/plans/toggle/{plan}', [PlanController::class, 'toggle'])->name('plans.toggle');
    Route::delete('/plans/{plan}', [PlanController::class, 'destroy'])->name('plans.destroy');
});
