<?php

namespace App\Http\Controllers\Admin\Soul;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\Image;
use App\Models\Practice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class PracticeController extends Controller
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

        $count = Practice::all()->count();

        $practices = Practice::with(['image'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('title LIKE ?', ["%{$search}%"]);
                });
            })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('admin/soul/practices/index', [
            'practices' => fn() => $practices,
            'options' => fn() => $options,
            'count' => fn() => $count,
        ]);
    }


    public function show(Practice $practice)
    {
        $count = Practice::all()->count();
        $practice->load(['image', 'filters']);

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::PRACTICES)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        $video = $practice->video?->hlsVideo();

        return Inertia::render('admin/soul/practices/show', [
            'practice' => fn() => $practice,
            'count' => fn() => $count,
            'filters' => fn() => $filters,
            'video' => fn() => $video,
        ]);
    }

    public function create()
    {
        $count = Practice::all()->count();

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::PRACTICES)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        return Inertia::render('admin/soul/practices/create', [
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
            'video'       => ['required', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-matroska'],
        ]);

        $practice = Practice::create(Arr::except($validated, ['image', 'filters', 'image_alt', 'video', 'category_id']));

        $practice->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($practice->image) {
                $practice->image->delete();
            }
            Image::attachTo($practice, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('video')) {
            if ($practice->video) {
                $practice->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($practice, $tempPath);
            return redirect()
                ->route('admin.practices.index')
                ->with('message', 'Практика успешно создана. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()
            ->route('admin.practices.index')
            ->with('message', 'Практика успешно создана.');
    }

    public function destroy(Practice $practice)
    {
        $practice->delete();

        return redirect()->route('admin.practices.index')->with('message', 'Практика успешно удалена');
    }

    public function update(Practice $practice, Request $request): RedirectResponse
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
            'video'       => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-matroska'],
        ]);

        $practice->update(Arr::except($validated, ['image', 'filters', 'image_alt', 'video', 'category_id']));

        $practice->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($practice->image) {
                $practice->image->delete();
            }
            Image::attachTo($practice, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('video')) {
            if ($practice->video) {
                $practice->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($practice, $tempPath);
            return redirect()
                ->back()
                ->with('message', 'Практика успешно обновлена. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()->back()->with('message', 'Практика успешно обновлена!');
    }
}
