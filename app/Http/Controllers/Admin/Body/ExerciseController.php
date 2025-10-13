<?php

namespace App\Http\Controllers\Admin\Body;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Body\StoreExerciseRequest;
use App\Http\Requests\Admin\Body\UpdateExerciseRequest;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\ContentCategory;
use App\Models\Image;
use App\Models\Exercise;
use App\Support\SortAndSearchHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class ExerciseController extends Controller
{
    public function index(Request $request)
    {
        $sorting = SortAndSearchHelper::extract($request);

        $sortBy = $sorting['sort_by'];
        $order = $sorting['order'];
        $search = $sorting['search'];
        $options = $sorting['options'];

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

        $categories = ContentCategory::select(['id', 'name'])
            ->where('categorizable_type', Exercise::class)
            ->get();

        $categories = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        })->toArray();

        $video = $exercise->video?->hlsVideo();

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

        $categories = ContentCategory::select(['id', 'name'])
            ->where('categorizable_type', Exercise::class)
            ->get();


        $categories = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        })->toArray();

        return Inertia::render('admin/body/exercises/create', [
            'count' => $count,
            'filters' => fn() => $filters,
            'categories' => fn() => $categories,
        ]);
    }

    public function store(StoreExerciseRequest $request)
    {
        $validated = $request->validated();

        $exercise = Exercise::create(Arr::except($validated, ['image', 'filters', 'image_alt', 'video', 'category_id']));

        if (isset($validated['category_id'])) {
            $category = ContentCategory::find($validated['category_id']);
            $exercise->category()->save($category);
        }

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
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($exercise, $tempPath);
            return redirect()
                ->route('admin.exercises.index')
                ->with('message', 'Упражнение успешно создано. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()
            ->route('admin.exercises.index')
            ->with('message', 'Упражнение успешно создано.');
    }

    public function destroy(Exercise $exercise)
    {
        $exercise->delete();

        return redirect()->route('admin.exercises.index')->with('message', 'Упражнение успешно удалено');
    }

    public function update(Exercise $exercise, UpdateExerciseRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $exercise->update(Arr::except($validated, ['image', 'filters', 'image_alt', 'video', 'category_id']));

        if (isset($validated['category_id'])) {
            $category = ContentCategory::find($validated['category_id']);
            $exercise->category()->save($category);
        }

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
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($exercise, $tempPath);
            return redirect()
                ->back()
                ->with('message', 'Упражнение успешно обновлено. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()->back()->with('message', 'Упражнение успешно обновлено!');
    }
}
