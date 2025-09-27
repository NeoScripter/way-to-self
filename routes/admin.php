<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEditorController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminUserController;
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
    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [AdminUserController::class, 'show'])->name('users.show');
    Route::patch('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    Route::post('/users/{user}', [UserController::class, 'update'])->name('users.ban');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});
