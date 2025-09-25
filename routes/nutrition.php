<?php

use App\Http\Controllers\Account\NutritionArticleController;
use App\Http\Controllers\Account\NutritionController;
use App\Http\Controllers\Account\NutritionRecipeController;
use App\Http\Controllers\Account\NutritionSearchController;
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
