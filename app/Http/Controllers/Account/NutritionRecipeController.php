<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionRecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::select(['id', 'description', 'title'])->free()->with(['image'])->paginate(16);

        return Inertia::render('account/recipes', [
            'recipes' => $recipes
        ]);
    }
    public function show(Recipe $recipe)
    {
        $recipe->load(['steps', 'infos']);

        return Inertia::render('account/recipe', [
            'recipe' => $recipe,
            'video' => $recipe->video->srcVideo(),
        ]);
    }
}
