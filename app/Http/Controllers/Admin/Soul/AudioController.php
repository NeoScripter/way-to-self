<?php

namespace App\Http\Controllers\Admin\Soul;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Jobs\ConvertAudioToHls;
use App\Jobs\ProcessAndAttachAudio;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\Image;
use App\Models\Audio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class AudioController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:title,updated_at',
            'order' => 'nullable|in:asc,desc',
            'search' => 'nullable|string'
        ]);

        $sortBy = $validated['sort_by'] ?? 'title';
        $order = $validated['order'] ?? 'asc';
        $search = $validated['search'] ?? null;

        $options = [
            ['value' => 'title',  'label' => 'По названию'],
            ['value' => 'updated_at', 'label' => 'По дате изменения'],
        ];

        $count = Audio::all()->count();

        $audios = Audio::with(['image'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('title LIKE ?', ["%{$search}%"]);
                });
            })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('admin/soul/audios/index', [
            'audios' => fn() => $audios,
            'options' => fn() => $options,
            'count' => fn() => $count,
        ]);
    }


    public function show(Audio $audio)
    {
        $count = Audio::all()->count();
        $audio->load(['image', 'filters']);

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::AUDIOS)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        return Inertia::render('admin/soul/audios/show', [
            'audio' => fn() => $audio,
            'count' => fn() => $count,
            'filters' => fn() => $filters,
            'audio' => fn() => $audio,
            'stream' => route('audio.stream', ['audio' => $audio->id]),
        ]);
    }

    public function create()
    {
        $count = Audio::all()->count();

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::AUDIOS)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        return Inertia::render('admin/soul/audios/create', [
            'count' => $count,
            'filters' => fn() => $filters,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
            'description' => 'required|string|max:4000',
            'body'        => 'required|string|max:64000',
            'duration'    => 'required|numeric|min:1|max:200',
            'complexity'  => 'required|numeric|min:1|max:10',
            'filters' => 'required|array',
            'filters.*' => 'numeric|exists:category_filters,id',
            'image_alt'   => 'required|string|max:400',
            'image'       => 'required|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'audio'       => ['required', 'file', 'mimetypes:audio/mpeg,audio/mp3,audio/wav,audio/x-m4a,audio/aac'],
        ]);

        $validated['audio_path'] = $validated['audio'];
        $audio = Audio::create(Arr::except($validated, ['image', 'filters', 'image_alt', 'audio']));

        $audio->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($audio->image) {
                $audio->image->delete();
            }
            Image::attachTo($audio, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('audio')) {
            if ($audio->audio_path) {
                Storage::disk('local')->delete($audio->getRawOriginal('audio_path'));
            }

            $tempPath = $request->file('audio')->store('temp_audios');

            ProcessAndAttachAudio::dispatch($audio, $tempPath);

            return redirect()
                ->route('admin.soul.audios.index')
                ->with('message', 'Медитация успешно создана. Идет обработка, она может занять до получаса.');
        }

        return redirect()
            ->route('admin.soul.audios.index')
            ->with('message', 'Медитация успешно создана.');
    }

    public function destroy(Audio $audio)
    {
        $audio->delete();

        return redirect()->route('admin.soul.audios.index')->with('message', 'Медитация успешно удалена');
    }

    public function update(Audio $audio, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:400',
            'description' => 'required|string|max:4000',
            'body'        => 'required|string|max:64000',
            'duration'    => 'required|numeric|min:1|max:200',
            'complexity'  => 'required|numeric|min:1|max:10',
            'filters' => 'required|array',
            'filters.*' => 'numeric|exists:category_filters,id',
            'image_alt'   => 'nullable|string|max:400',
            'image'       => 'nullable|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'audio'       => ['required', 'file', 'mimetypes:audio/mpeg,audio/mp3,audio/wav,audio/x-m4a,audio/aac'],
        ]);

        $audio->update(Arr::except($validated, ['image', 'filters', 'image_alt', 'audio']));

        $audio->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($audio->image) {
                $audio->image->delete();
            }
            Image::attachTo($audio, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('audio')) {
            if ($audio->audio_path) {
                Storage::disk('local')->delete($audio->getRawOriginal('audio_path'));
            }

            $tempPath = $request->file('audio')->store('temp_audios');

            ProcessAndAttachAudio::dispatch($audio, $tempPath);

            return redirect()
                ->route('admin.soul.audios.index')
                ->with('message', 'Медитация успешно обновлена. Идет обработка, она может занять до получаса.');
        }

        return redirect()->back()->with('message', 'Медитация успешно обновлена!');
    }
}
