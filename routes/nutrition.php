<?php

use App\Http\Controllers\Account\NutritionArticleController;
use App\Http\Controllers\Account\NutritionController;
use App\Http\Controllers\Account\NutritionRecipeController;
use App\Http\Controllers\Account\NutritionSearchController;
use App\Http\Controllers\Admin\Nutrition\ArticleController;
use App\Http\Controllers\Admin\Nutrition\CategoryController;
use App\Http\Controllers\Admin\Nutrition\FAQController;
use App\Http\Controllers\Admin\Nutrition\FilterController;
use App\Http\Controllers\Admin\Nutrition\RecipeController;
use App\Http\Controllers\Admin\Nutrition\RecipeInfoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth',  'banned', 'tier.access:nutrition'])->prefix('account/nutrition')->name('nutrition.')->group(function () {

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

Route::middleware(['auth', 'banned', 'role:admin,editor'])->prefix('admin/nutrition')->name('admin.nutrition.')->group(function () {

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

    Route::prefix('/filters')->name('filters.')->group(function () {
        Route::get('/', [FilterController::class, 'index'])->name('index');
        Route::post('/store', [FilterController::class, 'store'])->name('store');
        Route::post('/update/{title}', [FilterController::class, 'update'])->name('update');
        Route::delete('/mass-destroy', [FilterController::class, 'massDestroy'])->name('massDestroy');
        Route::delete('/{filter}', [FilterController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/categories')->name('categories.')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('index');
        Route::post('/store', [CategoryController::class, 'store'])->name('store');
        Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/recipes')->name('recipes.')->group(function () {
        Route::get('/', [RecipeController::class, 'index'])->name('index');
        Route::post('/store', [RecipeController::class, 'store'])->name('store');
        Route::post('/{recipe}', [RecipeController::class, 'update'])->name('update');
        Route::get('/create', [RecipeController::class, 'create'])->name('create');
        Route::get('/{recipe}', [RecipeController::class, 'show'])->name('show');
        Route::delete('/{recipe}', [RecipeController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('/infos')->name('infos.')->group(function () {
        Route::post('/store/{recipe}', [RecipeInfoController::class, 'store'])->name('store');
        Route::post('/{info}', [RecipeInfoController::class, 'update'])->name('update');
        Route::delete('/{info}', [RecipeInfoController::class, 'destroy'])->name('destroy');
    });
});
