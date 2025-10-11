<?php

namespace App\Http\Controllers\Admin\Body;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\ProgramBlock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    public function store(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
            'description' => 'required|string|max:4000',
        ]);

        $program->blocks()->create($validated);

        return redirect()
            ->back()
            ->with('message', 'Блок успешно создан.');
    }

    public function destroy(ProgramBlock $block)
    {
        $block->delete();

        return redirect()
            ->back()
            ->with('message', 'Блок успешно удален');
    }

    public function update(ProgramBlock $block, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'nullable|string|max:400',
            'description' => 'nullable|string|max:4000',
        ]);

        $block->update($validated);

        return redirect()->back()->with('message', 'Блок успешно обновлен!');
    }
}
