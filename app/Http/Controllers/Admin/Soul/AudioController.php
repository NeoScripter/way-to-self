<?php

namespace App\Http\Controllers\Admin\Soul;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Soul\StoreAudioRequest;
use App\Http\Requests\Admin\Soul\UpdateAudioRequest;
use App\Jobs\ConvertAudioToHls;
use App\Jobs\ProcessAndAttachAudio;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\Image;
use App\Models\Audio;
use App\Support\SortAndSearchHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class AudioController extends Controller
{
    public function index(Request $request)
    {
        $sorting = SortAndSearchHelper::extract($request);

        $sortBy = $sorting['sort_by'];
        $order = $sorting['order'];
        $search = $sorting['search'];
        $options = $sorting['options'];

        $count = Audio::count();

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
        $count = Audio::count();
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
            'stream' => route('audio.stream', ['audio' => $audio?->id]),
        ]);
    }

    public function create()
    {
        $count = Audio::count();

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

    public function store(StoreAudioRequest $request)
    {
        $validated = $request->validated();

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

    public function update(Audio $audio, UpdateAudioRequest $request): RedirectResponse
    {
        $validated = $request->validated();

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
