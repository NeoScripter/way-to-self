<?php

namespace App\Http\Controllers\Admin\Home;

use App\Enums\ContentType;
use App\Enums\EntryKeys;
use App\Http\Controllers\Controller;
use App\Models\Audio;
use App\Models\HomeEntry;
use App\Support\ItemMapper;
use Inertia\Inertia;

class AudioController extends Controller
{
    public function index()
    {
        $entry = HomeEntry::where('key', '=', EntryKeys::SOUL)->first();

        $paid = ItemMapper::from(
            Audio::with('image')->paid()->select(['id', 'title', 'description'])->get()
        );
        $free = ItemMapper::from(
            Audio::with('image')->free()->select(['id', 'title', 'description'])->get()
        );

        return Inertia::render('admin/home/home-entries', [
            'namespace' => fn() => 'audios',
            'entry' => fn() => $entry,
            'selected' => fn() => $free,
            'options' => fn() => $paid,
        ]);
    }

    public function update(Audio $audio)
    {
        if ($audio->isFree()) {
            $audio->update([
                'type' => ContentType::PAID->value
            ]);
        } else {
            $audio->update([
                'type' => ContentType::FREE->value
            ]);
        }

        return redirect()->back();
    }
}
