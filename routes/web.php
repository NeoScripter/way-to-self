<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\User\ArticleController;
use App\Http\Controllers\User\ExerciseController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\RecipeController;
use App\Http\Controllers\User\TierCartController;
use App\Http\Controllers\User\TierController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::get('/shop', function () {
    abort(503);
})->name('shop');

Route::get('/tiers', [TierController::class, 'index'])->name('tiers.index');
Route::post('/tier-cart/{tier}', [TierCartController::class, 'update'])->name('cart.tiers.update');
Route::post('/empty-cart', [TierCartController::class, 'empty'])->name('cart.tiers.empty');

Route::name('user.')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/article/{article}', [ArticleController::class, 'show'])->name('articles.show');
    Route::get('/recipe/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');
    Route::get('/exercise/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
});

Route::middleware(['auth'])->group(function () {
    Route::get('account', AccountController::class)->name('account');

    Route::name('account.')->group(function () {
        Route::get('account/profile', [ProfileController::class, 'index'])->name('index');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
