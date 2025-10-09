<?php

namespace App\Http\Controllers\Admin\Body;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\ContentCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = ContentCategory::select(['id', 'name'])
            ->where('type', '=', CategoryType::EXERCISES)
            ->get();

        return Inertia::render('admin/body/exercise-categories', [
            'categories' => fn() => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:140',
        ]);

        $validated['type'] = CategoryType::EXERCISES;

        ContentCategory::create($validated);

        return redirect()->back();
    }

    public function destroy(ContentCategory $category)
    {
        $category->delete();

        return redirect()->back();
    }
}
