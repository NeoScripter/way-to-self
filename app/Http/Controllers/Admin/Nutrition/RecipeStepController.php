<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Recipe;
use App\Models\RecipeStep;
use App\Rules\AdminFieldRules;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class RecipeStepController extends Controller
{
    public function store(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'body'       => AdminFieldRules::body(),
            'image'       => AdminFieldRules::image(false),
            'image_alt'       => AdminFieldRules::imageAlt(),
            'order' => AdminFieldRules::order(),
        ]);

        $step = $recipe->steps()->create(Arr::except($validated, ['image', 'image_alt']));

        if ($request->hasFile('image')) {
            Image::attachTo($step, $request->file('image'), $validated['image_alt'], 720, 'image');
        }

        return redirect()
            ->back()
            ->with('message', 'Блок успешно создан.');
    }

    public function destroy(RecipeStep $step)
    {
        $step->delete();

        return redirect()
            ->back()
            ->with('message', 'Блок успешно удален');
    }

    public function update(RecipeStep $step, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'body'       => AdminFieldRules::body(),
            'image'       => AdminFieldRules::image(false),
            'image_alt'       => AdminFieldRules::imageAlt(),
            'order' => AdminFieldRules::order(),
        ]);

        $step->update(Arr::except($validated, ['image', 'image_alt']));

        if ($request->hasFile('image')) {
            if ($step->image) {
                $step->image->delete();
            }
            Image::attachTo($step, $request->file('image'), $validated['image_alt'], 720, 'image');
        }

        return redirect()->back()->with('message', 'Блок успешно обновлен!');
    }
}
