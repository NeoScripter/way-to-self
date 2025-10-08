<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function show(Recipe $recipe)
    {
        abort_unless($recipe->isFree(), 404);
        $user = Auth::user();
        $isFavorite = $user ? $recipe->favoritedBy()->where('user_id', $user->id)->exists() : null;

        $recipe->load(['steps', 'infos'])
            ->makeHidden(['video_path']);

        return Inertia::render('user/recipe', [
            'recipe' => $recipe,
            'video' => $recipe->video->hlsVideo(),
            'isFavorite' => $isFavorite,
        ]);
    }
}
