<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Recipe;
use App\Models\RecipeInfo;
use App\Rules\AdminFieldRules;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class RecipeInfoController extends Controller
{
    public function store(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'title'       => AdminFieldRules::title(),
            'body'       => AdminFieldRules::body(false),
            'image'       => AdminFieldRules::image(false),
            'image_alt'       => AdminFieldRules::imageAlt(false),
            'order' => AdminFieldRules::order(),
        ]);

        $info = $recipe->infos()->create(Arr::except($validated, ['image', 'image_alt']));

        if ($request->hasFile('image')) {
            Image::attachTo($info, $request->file('image'), $validated['image_alt'], 720, 'image');
        }

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
            'title'       => AdminFieldRules::title(),
            'body'       => AdminFieldRules::body(false),
            'image'       => AdminFieldRules::image(false),
            'image_alt'       => AdminFieldRules::imageAlt(false),
            'order' => AdminFieldRules::order(),
        ]);

        $info->update(Arr::except($validated, ['image', 'image_alt']));

        if ($request->hasFile('image')) {
            if ($info->image) {
                $info->image->delete();
            }
            Image::attachTo($info, $request->file('image'), $validated['image_alt'], 720, 'image');
        }

        return redirect()->back()->with('message', 'Блок успешно обновлен!');
    }

    public function reorder(RecipeInfo $from, Request $request): RedirectResponse
    {
        $data = $request->validate([
            'id' => 'required|numeric|exists:recipe_infos,id',
        ]);

        $to = RecipeInfo::find($data['id']);
        $toOrder = $to->order;

        $to->update(['order' => $from->order]);
        $from->update(['order' => $toOrder]);

        return redirect()->back();
    }
}
