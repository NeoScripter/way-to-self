<?php

namespace App\Http\Controllers\Admin\Home;

use App\Enums\ContentType;
use App\Enums\EntryKeys;
use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Models\HomeEntry;
use App\Support\ItemMapper;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index()
    {
        $entry = HomeEntry::where('key', '=', EntryKeys::NUTRITION)->first();

        $paid = ItemMapper::from(
            Recipe::with('image')->paid()->select(['id', 'title', 'description'])->get()
        );
        $free = ItemMapper::from(
            Recipe::with('image')->free()->select(['id', 'title', 'description'])->get()
        );

        return Inertia::render('admin/home/home-entries', [
            'namespace' => fn() => 'recipes',
            'entry' => fn() => $entry,
            'selected' => fn() => $free,
            'options' => fn() => $paid,
        ]);
    }

    public function update(Recipe $recipe)
    {
        if ($recipe->isFree()) {
            $recipe->update([
                'type' => ContentType::PAID->value
            ]);
        } else {
            $recipe->update([
                'type' => ContentType::FREE->value
            ]);
        }

        return redirect()->back();
    }
}
