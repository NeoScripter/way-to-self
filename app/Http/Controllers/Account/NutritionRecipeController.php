<?php

namespace App\Http\Controllers\Account;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\CategoryFilter;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NutritionRecipeController extends Controller
{
    public function index(Request $request)
    {
        $types = $request->validate([
            'types'   => 'nullable|array',
            'types.*' => 'string',
        ])['types'] ?? null;

        $search = $request->validate([
            'search'   => 'nullable|string',
        ])['search'] ?? null;

        $recipes = Recipe::select(['id', 'rating', 'duration', 'description', 'title'])
            ->withFiltersAndSearch($types, $search)
            ->with('image')
            ->paginate(16)
            ->withQueryString();

        $menuItems = CategoryFilter::menuItemsForCategory(CategoryType::RECIPES);

        return Inertia::render('account/recipes', [
            'recipes' => $recipes,
            'menuItems' => $menuItems
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
