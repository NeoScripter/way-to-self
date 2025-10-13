<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\RecipeInfo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RecipeInfoController extends Controller
{
    public function store(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
            'description' => 'required|string|max:4000',
        ]);

        $program->infos()->create($validated);

        return redirect()
            ->back()
            ->with('message', 'Блок успешно создан.');
    }

    public function destroy(RecipeInfo $info)
    {
        $info->delete();

        return redirect()
            ->back()
            ->with('message', 'Блок успешно удален');
    }

    public function update(RecipeInfo $info, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'nullable|string|max:400',
            'description' => 'nullable|string|max:4000',
        ]);

        $info->update($validated);

        return redirect()->back()->with('message', 'Блок успешно обновлен!');
    }
}
