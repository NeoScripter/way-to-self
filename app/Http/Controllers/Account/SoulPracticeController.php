<?php

namespace App\Http\Controllers\Account;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\CategoryFilter;
use App\Models\Practice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SoulPracticeController extends Controller
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

        $practices = Practice::select(['id', 'rating', 'duration', 'description', 'title'])
            ->withFiltersAndSearch($types, $search)
            ->with('image')
            ->paginate(16)
            ->withQueryString();

        $menuItems = CategoryFilter::menuItemsForCategory(CategoryType::PRACTICES);

        return Inertia::render('account/practices', [
            'practices' => $practices,
            'menuItems' => $menuItems
        ]);
    }

    public function show(Practice $practice)
    {
        $user = Auth::user();

        $practice->load(['video']);
        $isFavorite = $practice->favoritedBy()->where('user_id', $user->id)->exists();

        return Inertia::render('account/practice', [
            'practice' => $practice,
            'isFavorite' => $isFavorite,
            'labels' => ['Главная', 'Душа', 'Практики'],
            'video' => $practice->video->srcVideo(),
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = Auth::user();

        User::toggleFavorite($user, Practice::class, $id);

        return redirect()->back();
    }
}
