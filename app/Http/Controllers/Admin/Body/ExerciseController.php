<?php

namespace App\Http\Controllers\Admin\Body;

use App\Enums\ArticleType;
use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Models\CategoryFilter;
use App\Models\Image;
use App\Models\Exercise;
use App\Models\ExerciseCategory;
use App\Models\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class ExerciseController extends Controller
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

        $count = Exercise::all()->count();

        $exercises = Exercise::with(['image'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('title LIKE ?', ["%{$search}%"]);
                });
            })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('admin/body/exercises/index', [
            'exercises' => fn() => $exercises,
            'options' => fn() => $options,
            'count' => fn() => $count,
        ]);
    }


    public function show(Exercise $exercise)
    {
        $count = Exercise::all()->count();
        $exercise->load(['image', 'filters']);

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::EXERCISES)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        $categories = ExerciseCategory::select(['id', 'name'])
            ->get();

        $categories = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        })->toArray();

        $video = $exercise->video?->srcVideo();

        return Inertia::render('admin/body/exercises/show', [
            'exercise' => fn() => $exercise,
            'count' => fn() => $count,
            'filters' => fn() => $filters,
            'categories' => fn() => $categories,
            'video' => fn() => $video,
        ]);
    }

    public function create()
    {
        $count = Exercise::all()->count();

        return Inertia::render('admin/body/exercises/create', [
            'count' => $count,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:120',
            'description' => 'required|string|max:500',
            'body'        => 'required|string|max:64000',
            'duration'    => 'required|numeric|min:1|max:200',
            'complexity'  => 'required|numeric|min:1|max:10',
            'category_id' => 'required|numeric|exists:exercise_categories,id',
            'filters' => 'required|array',
            'filters.*' => 'numeric|exists:category_filters,id',
            'image_alt'   => 'required|string|max:400',
            'image'       => 'required|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'video'       => ['required', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-matroska'],
        ]);

        $exercise = Exercise::create(Arr::except($validated, ['image', 'filters', 'image_alt', 'video', 'category_id']));

        $category = ExerciseCategory::find($validated['category_id']);
        $category->exercise()->associate($exercise);
        $category->save();

        $exercise->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($exercise->image) {
                $exercise->image->delete();
            }
            Image::attachTo($exercise, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('video')) {
            if ($exercise->video) {
                $exercise->video->delete();
            }
            Video::attachTo($exercise, $request->file('video'));
        }

        return redirect()
            ->route('admin.exercises.index')
            ->with('message', 'Упражнение успешно создано');
    }

    public function destroy(Exercise $exercise)
    {
        $exercise->delete();

        return redirect()->route('admin.exercises.index')->with('message', 'Упражнение успешно удалено');
    }

    public function update(Exercise $exercise, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:120',
            'description' => 'required|string|max:500',
            'body'        => 'required|string|max:64000',
            'duration'    => 'required|numeric|min:1|max:200',
            'complexity'  => 'required|numeric|min:1|max:10',
            'category_id' => 'required|numeric|exists:category_filters,id',
            'filters' => 'required|array',
            'filters.*' => 'numeric|exists:category_filters,id',
            'image_alt'   => 'nullable|string|max:400',
            'image'       => 'nullable|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'video'       => ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/x-matroska'],
        ]);

        $exercise->update(Arr::except($validated, ['image', 'filters', 'image_alt', 'video', 'category_id']));

        $category = ExerciseCategory::find($validated['category_id']);
        $category->exercise()->associate($exercise);
        $category->save();

        $exercise->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($exercise->image) {
                $exercise->image->delete();
            }
            Image::attachTo($exercise, $request->file('image'), $validated['image_alt'], 560, 'image');
        }

        if ($request->hasFile('video')) {
            if ($exercise->video) {
                $exercise->video->delete();
            }
            Video::attachTo($exercise, $request->file('video'));
        }

        return redirect()->back()->with('status', 'Упражнение успешно обновлено!');
    }
}
