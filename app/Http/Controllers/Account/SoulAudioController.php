<?php

namespace App\Http\Controllers\Account;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\Audio;
use App\Models\CategoryFilter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SoulAudioController extends Controller
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

        $audios = Audio::select(['id', 'rating', 'duration', 'description', 'title'])
            ->withFiltersAndSearch($types, $search)
            ->with('image')
            ->paginate(16)
            ->withQueryString();

        $menuItems = CategoryFilter::menuItemsForCategory(CategoryType::AUDIOS);

        return Inertia::render('account/meditations', [
            'audios' => $audios,
            'menuItems' => $menuItems
        ]);
    }

    public function show(Audio $audio)
    {
        $user = Auth::user();

        $audio->load(['image']);
        $isFavorite = $audio->favoritedBy()->where('user_id', $user->id)->exists();

        return Inertia::render('account/meditation', [
            'audio' => $audio,
            'isFavorite' => $isFavorite,
            'labels' => ['Главная', 'Душа', 'Медитации']
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = Auth::user();

        User::toggleFavorite($user, Audio::class, $id);

        return redirect()->back();
    }
}
