<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function show(Exercise $exercise)
    {
        abort_unless($exercise->isFree(), 404);
        $user = Auth::user();

        $isFavorite = $user ? $exercise->favoritedBy()->where('user_id', $user->id)->exists() : null;
        $exercise->makeHidden(['video_path']);

        return Inertia::render('user/exercise', [
            'exercise' => $exercise,
            'video' => $exercise->video->hlsVideo(),
            'isFavorite' => $isFavorite,
        ]);
    }
}
