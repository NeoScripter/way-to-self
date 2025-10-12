<?php

namespace App\Http\Controllers\Admin\Body;

use App\Http\Controllers\Controller;
use App\Models\ProgramBlock;
use Illuminate\Http\Request;

class BlockExerciseController extends Controller
{
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'block_id' => 'required|exists:program_blocks,id',
        ]);

        $block = ProgramBlock::find($validated['block_id'])->first();
        $block->exercises()->toggle($id);

        return redirect()
            ->back();
    }
}
