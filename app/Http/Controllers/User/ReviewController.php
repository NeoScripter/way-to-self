<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Nutrition\StoreReviewRequest;
use App\Http\Requests\Admin\Nutrition\UpdateReviewRequest;
use App\Jobs\ProcessAndAttachVideo;
use App\Models\CategoryFilter;
use App\Models\ContentCategory;
use App\Models\Exercise;
use App\Models\Image;
use App\Models\Review;
use App\Support\SortAndSearchHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $sorting = SortAndSearchHelper::extract($request);

        $sortBy = $sorting['sort_by'];
        $order = $sorting['order'];
        $search = $sorting['search'];
        $options = $sorting['options'];

        $count = Review::count();

        $reviews = Review::with(['image'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('title LIKE ?', ["%{$search}%"]);
                });
            })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('admin/nutrition/reviews/index', [
            'reviews' => fn() => $reviews,
            'options' => fn() => $options,
            'count' => fn() => $count,
        ]);
    }


    public function show(Review $review)
    {
        $count = Review::count();

        $review->load([
            'image',
            'filters',
            'infos' => fn($q) => $q->orderBy('order'),
            'steps' => fn($q) => $q->orderBy('order'),
        ]);

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::reviewS)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        $exercises = Exercise::select(['id', 'title'])->with('image')->get()->map(function ($exercise) {
            return [
                'id' => $exercise->id,
                'title' => $exercise->title,
                'image' => $exercise->image->path ?? null
            ];
        });

        $categories = ContentCategory::select(['id', 'name'])
            ->where('categorizable_type', Review::class)
            ->get();

        $categories = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        })->toArray();

        $video = $review->video?->hlsVideo();

        return Inertia::render('admin/nutrition/reviews/show', [
            'review' => fn() => $review,
            'count' => fn() => $count,
            'filters' => fn() => $filters,
            'video' => fn() => $video,
            'options' => fn() => $exercises,
            'categories' => fn() => $categories,
        ]);
    }

    public function create()
    {
        $count = Review::count();

        $filters = CategoryFilter::select(['id', 'name'])
            ->whereNotNull('name')
            ->where('category', '=', CategoryType::reviewS)
            ->get();

        $filters = $filters->map(function ($filter) {
            return [
                'value' => $filter->id,
                'label' => $filter->name,
            ];
        })->toArray();

        $categories = ContentCategory::select(['id', 'name'])
            ->where('categorizable_type', Review::class)
            ->get();

        $categories = $categories->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        })->toArray();

        return Inertia::render('admin/nutrition/reviews/create', [
            'count' => $count,
            'filters' => fn() => $filters,
            'categories' => fn() => $categories,
        ]);
    }

    public function store(StoreReviewRequest $request)
    {
        $validated = $request->validated();

        $review = Review::create(Arr::except($validated, ['image', 'category_id', 'filters', 'image_alt', 'video']));

        $review->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($review->image) {
                $review->image->delete();
            }
            Image::attachTo($review, $request->file('image'), $validated['image_alt'], 360, 'image');
        }

        if ($request->hasFile('video')) {
            if ($review->video) {
                $review->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($review, $tempPath);
            return redirect()
                ->route('admin.nutrition.reviews.index')
                ->with('message', 'Рецепт успешно создан. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()
            ->route('admin.nutrition.reviews.index')
            ->with('message', 'Рецепт успешно создан.');
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('admin.nutrition.reviews.index')->with('message', 'Рецепт успешно удален');
    }

    public function update(Review $review, UpdateReviewRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $review->update(Arr::except($validated, ['image', 'category_id', 'filters', 'image_alt', 'video']));

        $review->filters()->sync($validated['filters']);

        if ($request->hasFile('image')) {
            if ($review->image) {
                $review->image->delete();
            }
            Image::attachTo($review, $request->file('image'), $validated['image_alt'], 360, 'image');
        }

        if ($request->hasFile('video')) {
            if ($review->video) {
                $review->video->delete();
            }
            $tempPath = $request->file('video')->store('temp_videos');
            ProcessAndAttachVideo::dispatch($review, $tempPath);
            return redirect()
                ->back()
                ->with('message', 'Рецепт успешно обновлен. Ожидайте окончания обработки видео в течение часа.');
        }

        return redirect()->back()->with('message', 'Рецепт успешно обновлен!');
    }
}

