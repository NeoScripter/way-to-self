<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function show(Exercise $exercise)
    {
        abort_unless($exercise->isFree(), 404);

        return Inertia::render('user/exercise', [
            'exercise' => $exercise,
            'video' => $exercise->video->hlsVideo(),
        ]);
    }
}
