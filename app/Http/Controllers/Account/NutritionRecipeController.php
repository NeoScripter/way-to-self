<?php

namespace App\Http\Controllers\Account;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\CategoryFilter;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $recipes = Recipe::select(['id', 'complexity', 'duration', 'description', 'title'])
            ->withFiltersAndSearch($types, $search)
            ->with('image')
            ->paginate(16)
            ->withQueryString();

        $menuItems = CategoryFilter::menuItemsForCategory(CategoryType::RECIPES);

        return Inertia::render('account/recipes', [
            'recipes' => fn() => $recipes,
            'menuItems' => fn() => $menuItems
        ]);
    }

    public function show(Recipe $recipe)
    {
        $user = Auth::user();

        $recipe->load(['steps', 'infos'])
            ->makeHidden(['video_path']);

        $isFavorite = $recipe
            ->favoritedBy()
            ->where('user_id', $user->id)
            ->exists();

        return Inertia::render('account/recipe', [
            'recipe' => $recipe,
            'video' => $recipe->video->hlsVideo(),
            'isFavorite' => $isFavorite
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = Auth::user();

        User::toggleFavorite($user, Recipe::class, $id);

        return redirect()->back();
    }
}
