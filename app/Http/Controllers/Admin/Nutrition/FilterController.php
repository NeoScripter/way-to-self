<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Models\CategoryFilter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FilterController extends Controller
{
    public function index()
    {
        $filters = CategoryFilter::where('category', CategoryType::RECIPES)
            ->latest()
            ->get()
            ->groupBy('title');

        return Inertia::render('admin/nutrition/recipe-filters', [
            'filters' => fn() => $filters,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
            'name' => 'nullable|string|max:140',
        ]);

        $validated['category'] = CategoryType::RECIPES;

        CategoryFilter::create($validated);

        return redirect()->back();
    }

    public function destroy(CategoryFilter $filter)
    {
        $filter->delete();

        return redirect()->back();
    }

    public function massDestroy(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
        ]);

        CategoryFilter::where(function ($q) {
            $q->where('category', CategoryType::RECIPES)
                ->orWhereNull('category');
            })
            ->where('title', $validated['title'])
            ->delete();

        return redirect()->back()->with('message', 'Фильтры успешно удалены!');
    }

    public function update(string $title, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
        ]);

        $filters = CategoryFilter::where(function ($q) {
            $q->where('category', CategoryType::RECIPES)
                ->orWhereNull('category');
            })
            ->where('title', $title)
            ->get();

        $filters->each(function ($filter) use ($validated) {
            $filter->update(['title' => $validated['title']]);
        });

        return redirect()->back();
    }
}
