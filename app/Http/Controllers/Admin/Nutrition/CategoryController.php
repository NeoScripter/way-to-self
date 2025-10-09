<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Http\Controllers\Controller;
use App\Models\ContentCategory;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = ContentCategory::query()
            ->select(['id', 'name'])
            ->where('categorizable_type', Recipe::class)
            ->get();

        return Inertia::render('admin/nutrition/recipe-categories', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:140|unique:content_categories,name',
        ]);

        $validated['categorizable_type'] = Recipe::class;

        ContentCategory::create($validated);

        return redirect()->back();
    }

    public function destroy(ContentCategory $category)
    {
        $category->delete();

        return redirect()->back();
    }
}
