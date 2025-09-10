<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\BodyController;
use App\Http\Controllers\Account\NutritionArticleController;
use App\Http\Controllers\Account\NutritionController;
use App\Http\Controllers\Account\NutritionRecipeController;
use App\Http\Controllers\Account\NutritionSearchController;
use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\Account\SoulArticleController;
use App\Http\Controllers\Account\SoulAudioController;
use App\Http\Controllers\Account\SoulController;
use App\Http\Controllers\Account\SoulPracticeController;
use App\Http\Controllers\Account\SoulSearchController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\User\ArticleController;
use App\Http\Controllers\User\ExerciseController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\RecipeController;
use App\Http\Controllers\User\StreamAudioController;
use App\Http\Controllers\User\TierCartController;
use App\Http\Controllers\User\TierController;
use App\Notifications\SendPasswordNotification;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Password;

Route::get('/', HomeController::class)->name('home');
Route::get('/shop', function () {
    abort(503);
})->name('shop');

Route::get('/tiers', [TierController::class, 'index'])->name('tiers.index');
Route::post('/tier-cart/{tier}', [TierCartController::class, 'update'])->name('cart.tiers.update');
Route::post('/empty-cart', [TierCartController::class, 'empty'])->name('cart.tiers.empty');

Route::get('/payment/process', [RegisteredUserController::class, 'processPayment'])
    ->name('payment.process');

// Route::get('/preview-payment', function () {
//     return Inertia::render('user/payment', [
//         'status' => 'success'
//     ]);
// });
// Route::get('/preview-email', function () {

//     $user = \App\Models\User::first();
//     $notification = new SendPasswordNotification('SamplePass123');

//     return $notification->toMail($user);
// });

// Route::get('/preview-email2', function () {
//     $user = \App\Models\User::first();

//     // Example: Password reset
//     $token = Password::broker()->createToken($user);
//     $notification = (new \Illuminate\Auth\Notifications\VerifyEmail($token))->locale('ru');

//     return $notification->toMail($user);
// });

Route::name('user.')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');
    Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');
    Route::get('/exercise/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
});

Route::get('/audio/{audio}/stream', [StreamAudioController::class, 'stream'])
    ->name('audio.stream');

Route::get('/audio/{audio}/segments/{file}', [StreamAudioController::class, 'segment'])
    ->where('file', '.*')
    ->name('audio.segment');

// if (app()->environment('local')) {
Route::get('/dev-login', [AuthenticatedSessionController::class, 'dev'])->name('dev.login');
// }

Route::middleware(['auth'])->group(function () {
    Route::get('account', [AccountController::class, 'index'])->name('account');

    Route::name('account.')->group(function () {
        Route::get('account/profile', [ProfileController::class, 'index'])->name('edit');
    });

    Route::middleware('tier.access:nutrition')->prefix('account/nutrition')->name('nutrition.')->group(function () {

        Route::get('', [NutritionController::class, 'index'])->name('index');

        Route::get('/articles', [NutritionArticleController::class, 'index'])->name('articles');
        Route::get('/articles/{article}', [NutritionArticleController::class, 'show'])->name('articles.show');
        Route::post('/articles/{id}/favorite', [NutritionArticleController::class, 'update'])
            ->name('articles.favorite');

        Route::get('/recipes', [NutritionRecipeController::class, 'index'])->name('recipes');
        Route::get('/recipes/{recipe}', [NutritionRecipeController::class, 'show'])->name('recipes.show');
        Route::post('/recipes/{id}/favorite', [NutritionRecipeController::class, 'update'])
            ->name('recipes.favorite');

        Route::get('/search', NutritionSearchController::class)->name('search');
    });

    Route::middleware('tier.access:soul')->prefix('account/soul')->name('soul.')->group(function () {

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

    Route::middleware('tier.access:body')->prefix('account/body')->name('body.')->group(function () {
        Route::get('account/body', [BodyController::class, 'index'])->name('index');
        Route::get('/articles/{article}', [SoulArticleController::class, 'show'])->name('articles.show');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
