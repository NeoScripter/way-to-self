<?php

namespace App\Http\Controllers\Admin\Body;

use App\Http\Controllers\Controller;
use App\Models\ProgramBlock;

class BlockExerciseController extends Controller
{
    public function update(ProgramBlock $block, int $id)
    {
        $block->exercises()->toggle($id);

        return redirect()
            ->back();
    }
}
