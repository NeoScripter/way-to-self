<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEditorController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\Bot\BodyBotController;
use App\Http\Controllers\Admin\Bot\NutritionBotController;
use App\Http\Controllers\Admin\Bot\SoulBotController;
use App\Http\Controllers\Admin\Home\AudioController;
use App\Http\Controllers\Admin\Home\ExerciseController;
use App\Http\Controllers\Admin\Home\FAQController;
use App\Http\Controllers\Admin\Home\HomeEntryController;
use App\Http\Controllers\Admin\Home\OverviewController;
use App\Http\Controllers\Admin\Home\RecipeController;
use App\Http\Controllers\Admin\Home\ReviewController;
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

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin/home')->name('admin.home.')->group(function () {

    Route::prefix('/faqs')->name('faqs.')->group(function () {
        Route::post('/store', [FAQController::class, 'store'])->name('store');
        Route::get('/', [FAQController::class, 'index'])->name('index');
        Route::post('/{faq}', [FAQController::class, 'update'])->name('update');
        Route::delete('/{faq}', [FAQController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/overview')->name('overview.')->group(function () {
        Route::get('/', [OverviewController::class, 'show'])->name('show');
        Route::post('/store', [OverviewController::class, 'store'])->name('store');
        Route::post('/{overview}', [OverviewController::class, 'update'])->name('update');
        Route::delete('/', [OverviewController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/reviews')->name('reviews.')->group(function () {
        Route::get('/', [ReviewController::class, 'index'])->name('index');
        Route::post('/store', [ReviewController::class, 'store'])->name('store');
        Route::post('/{review}', [ReviewController::class, 'update'])->name('update');
        Route::get('/create', [ReviewController::class, 'create'])->name('create');
        Route::get('/{review}', [ReviewController::class, 'show'])->name('show');
        Route::delete('/{review}', [ReviewController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/entry')->name('entry.')->group(function () {
        Route::post('/{entry}', [HomeEntryController::class, 'update'])->name('update');
    });

    Route::prefix('/exercises')->name('exercises.')->group(function () {
        Route::get('/', [ExerciseController::class, 'index'])->name('index');
        Route::patch('/{exercise}', [ExerciseController::class, 'update'])->name('update');
    });

    Route::prefix('/recipes')->name('recipes.')->group(function () {
        Route::get('/', [RecipeController::class, 'index'])->name('index');
        Route::patch('/{recipe}', [RecipeController::class, 'update'])->name('update');
    });

    Route::prefix('/audios')->name('audios.')->group(function () {
        Route::get('/', [AudioController::class, 'index'])->name('index');
        Route::patch('/{audio}', [AudioController::class, 'update'])->name('update');
    });
});

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin/bot')->name('admin.bot.')->group(function () {

    Route::prefix('/soul')->name('soul.')->group(function () {
        Route::get('/', [SoulBotController::class, 'index'])->name('index');
        Route::patch('/', [SoulBotController::class, 'update'])->name('update');
    });

    Route::prefix('/body')->name('body.')->group(function () {
        Route::get('/', [BodyBotController::class, 'index'])->name('index');
        Route::patch('/', [BodyBotController::class, 'update'])->name('update');
    });
    Route::prefix('/nutrition')->name('nutrition.')->group(function () {
        Route::get('/', [NutritionBotController::class, 'index'])->name('index');
        Route::patch('/', [NutritionBotController::class, 'update'])->name('update');
    });
});
