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

        $recipes = Recipe::select(['id', 'rating', 'duration', 'description', 'title'])
            ->when($types, function ($query, $types) {
                $query->whereHas('filters', function ($q) use ($types) {
                    $q->whereIn('name', $types);
                });
            })
            ->with('image')
            ->paginate(16);

        $categories = CategoryFilter::forCategory(CategoryType::RECIPES)->get();

        $grouped = $categories->groupBy('title');

        $menuItems = $grouped->map(function ($items, $title) {
            return [
                'id' => Str::uuid()->toString(),
                'title' => $title,
                'items' => $items->map(function ($category) {
                    return [
                        'id' => Str::uuid()->toString(),
                        'type' => $category->name,
                        'label' => $category->name,
                    ];
                })->values()->all(),
            ];
        })->values()->all();

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
