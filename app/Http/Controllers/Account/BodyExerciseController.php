<?php

namespace App\Http\Controllers\Account;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\CategoryFilter;
use App\Models\Exercise;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BodyExerciseController extends Controller
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

        $exercises = Exercise::select(['id', 'complexity', 'duration', 'description', 'title'])
            ->withFiltersAndSearch($types, $search)
            ->with('image')
            ->paginate(16)
            ->withQueryString();


        $menuItems = CategoryFilter::menuItemsForCategory(CategoryType::EXERCISES);

        return Inertia::render('account/exercises', [
            'exercises' => fn() => $exercises,
            'menuItems' => fn() => $menuItems
        ]);
    }

    public function show(Exercise $exercise)
    {
        $user = Auth::user();

        $exercise->load(['image'])
            ->makeHidden(['video_path']);

        $isFavorite = $exercise
            ->favoritedBy()
            ->where('user_id', $user->id)
            ->exists();

        return Inertia::render('account/exercise', [
            'exercise' => $exercise,
            'video' => $exercise->video->hlsVideo(),
            'isFavorite' => $isFavorite,
            'labels' => ['Главная', 'Тело', 'Упражнения']
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = Auth::user();

        User::toggleFavorite($user, Exercise::class, $id);

        return redirect()->back();
    }
}
