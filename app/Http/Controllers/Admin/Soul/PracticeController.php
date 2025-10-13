<?php

namespace App\Http\Controllers\Admin\Soul;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Soul\StorePracticeRequest;
use App\Http\Requests\Admin\Soul\UpdatePracticeRequest;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\Image;
use App\Models\Practice;
use App\Support\SortAndSearchHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class PracticeController extends Controller
{
    public function index(Request $request)
    {
        $sorting = SortAndSearchHelper::extract($request);

        $sortBy = $sorting['sort_by'];
        $order = $sorting['order'];
        $search = $sorting['search'];
        $options = $sorting['options'];

        $count = Practice::count();

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
        $count = Practice::count();
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
        $count = Practice::count();

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

    public function store(StorePracticeRequest $request)
    {
        $validated = $request->validated();

        $practice = Practice::create(Arr::except($validated, ['image', 'filters', 'image_alt', 'video']));

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
                ->route('admin.soul.practices.index')
                ->with('message', 'Практика успешно создана. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()
            ->route('admin.soul.practices.index')
            ->with('message', 'Практика успешно создана.');
    }

    public function destroy(Practice $practice)
    {
        $practice->delete();

        return redirect()->route('admin.soul.practices.index')->with('message', 'Практика успешно удалена');
    }

    public function update(Practice $practice, UpdatePracticeRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $practice->update(Arr::except($validated, ['image', 'filters', 'image_alt', 'video']));

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
