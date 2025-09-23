<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEditorController;
use App\Http\Controllers\Admin\AdminProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin,editor'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
    Route::get('/profile', [AdminProfileController::class, 'show'])->name('profile');
    Route::get('/editors', [AdminEditorController::class, 'index'])->name('editors.index');
    Route::get('/editors/{user}', [AdminEditorController::class, 'show'])->name('editors.show');
    Route::get('/editors/create', [AdminEditorController::class, 'create'])->name('editors.create');
});
