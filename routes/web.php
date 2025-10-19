<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BotController;
use App\Http\Controllers\User\ArticleController;
use App\Http\Controllers\User\ExerciseController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\Legal\ConsentController;
use App\Http\Controllers\User\Legal\OfferController;
use App\Http\Controllers\User\Legal\PolicyController;
use App\Http\Controllers\User\RecipeController;
use App\Http\Controllers\User\StreamAudioController;
use App\Http\Controllers\User\TierCartController;
use App\Http\Controllers\User\TierController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/shop', function () {
    abort(503);
})->name('shop');

Route::post('/telegram/webhook', [BotController::class, 'webhook']);

Route::get('/tiers', [TierController::class, 'index'])->name('tiers.index');
Route::post('/tier-cart/{tier}', [TierCartController::class, 'update'])->name('cart.tiers.update');
Route::post('/tier-cart-promo', [TierCartController::class, 'store'])->name('cart.tiers.store');
Route::post('/empty-cart', [TierCartController::class, 'empty'])->name('cart.tiers.empty');

Route::get('/payment/process', [RegisteredUserController::class, 'processPayment'])
    ->name('payment.process');

Route::name('user.')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');
    Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');
    Route::get('/exercise/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
    Route::post('/articles/{id}/favorite', [ArticleController::class, 'update'])
        ->name('articles.favorite');
});

Route::get('/audio/{audio}/stream', [StreamAudioController::class, 'stream'])
    ->name('audio.stream');

Route::get('/audio/{audio}/segments/{file}', [StreamAudioController::class, 'segment'])
    ->where('file', '.*')
    ->name('audio.segment');

Route::middleware(['auth', 'banned'])->group(function () {
    Route::get('account', [AccountController::class, 'index'])->name('account');

    Route::name('account.')->middleware('role:user')->group(function () {
        Route::get('account/profile', [ProfileController::class, 'index'])->name('edit');
    });
});

Route::prefix('legal')->name('legal.')->group(function () {
    Route::get('/consent', ConsentController::class)->name('consent');
    Route::get('/policy', PolicyController::class)->name('policy');
    Route::get('/offer', OfferController::class)->name('offer');

});


// Route::get('/preview-payment', function () {
//     return Inertia::render('user/payment', [
//         'status' => 'success'
//     ]);
// });


require __DIR__ . '/body.php';
require __DIR__ . '/soul.php';
require __DIR__ . '/nutrition.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
