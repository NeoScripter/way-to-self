<?php

namespace App\Http\Controllers\Admin\Home;

use App\Enums\ContentType;
use App\Enums\EntryKeys;
use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\HomeEntry;
use App\Support\ItemMapper;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function index()
    {
        $entry = HomeEntry::where('key', '=', EntryKeys::BODY)->first();

        $paid = ItemMapper::from(
            Exercise::with('image')->paid()->select(['id', 'title', 'description'])->get()
        );
        $free = ItemMapper::from(
            Exercise::with('image')->free()->select(['id', 'title', 'description'])->get()
        );

        return Inertia::render('admin/home/home-entries', [
            'namespace' => fn() => 'exercises',
            'entry' => fn() => $entry,
            'selected' => fn() => $free,
            'options' => fn() => $paid,
        ]);
    }

    public function update(Exercise $exercise)
    {
        if ($exercise->isFree()) {
            $exercise->update([
                'type' => ContentType::PAID->value
            ]);
        } else {
            $exercise->update([
                'type' => ContentType::FREE->value
            ]);
        }

        return redirect()->back();
    }
}
