<?php

namespace App\Http\Controllers\User;

use App\Enums\ContentType;
use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function show(Recipe $recipe)
    {
        abort_unless($recipe->isFree(), 404);

        $recipe->load(['steps', 'infos']);

        return Inertia::render('user/recipe', [
            'recipe' => $recipe,
            'video' => $recipe->video->hlsVideo(),
        ]);
    }
}
