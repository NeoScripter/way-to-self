<?php

namespace App\Http\Controllers\Account;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\CategoryFilter;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BodyProgramController extends Controller
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

        $programs = Program::select(['id', 'complexity', 'duration', 'description', 'title'])
            ->withFiltersAndSearch($types, $search)
            ->with('image')
            ->paginate(16)
            ->withQueryString();

        $menuItems = CategoryFilter::menuItemsForCategory(CategoryType::PROGRAMS);

        return Inertia::render('account/programs', [
            'programs' => fn() => $programs,
            'menuItems' => fn() => $menuItems
        ]);
    }

    public function show(program $program)
    {
        $user = Auth::user();

        $program->load(['image', 'blocks.exercises.image'])
            ->makeHidden(['video_path']);

        $isFavorite = $program
            ->favoritedBy()
            ->where('user_id', $user->id)
            ->exists();

        return Inertia::render('account/program', [
            'program' => $program,
            'video' => $program->video->srcVideo(),
            'isFavorite' => $isFavorite,
            'labels' => ['Главная', 'Тело', 'Программы']
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = Auth::user();

        User::toggleFavorite($user, Program::class, $id);

        return redirect()->back();
    }
}
