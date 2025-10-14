<?php

namespace App\Http\Controllers\Admin\Home;

use App\Http\Controllers\Controller;
use App\Http\Requests\Home\StoreReviewRequest;
use App\Http\Requests\Home\UpdateReviewRequest;
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

        return Inertia::render('admin/home/reviews/index', [
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
        ]);

        return Inertia::render('admin/home/reviews/show', [
            'review' => fn() => $review,
            'count' => fn() => $count,
        ]);
    }

    public function create()
    {
        $count = Review::count();

        return Inertia::render('admin/home/reviews/create', [
            'count' => $count,
        ]);
    }

    public function store(StoreReviewRequest $request)
    {
        $validated = $request->validated();

        $review = Review::create(Arr::except($validated, ['image', 'image_alt']));

        if ($request->hasFile('image')) {
            if ($review->image) {
                $review->image->delete();
            }
            Image::attachTo($review, $request->file('image'), $validated['image_alt'], 360, 'image');
        }

        return redirect()
            ->route('admin.home.reviews.index')
            ->with('message', 'Отзыв успешно создан.');
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('admin.home.reviews.index')->with('message', 'Отзыв успешно удален');
    }

    public function update(Review $review, UpdateReviewRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $review->update(Arr::except($validated, ['image', 'image_alt']));

        if ($request->hasFile('image')) {
            if ($review->image) {
                $review->image->delete();
            }
            Image::attachTo($review, $request->file('image'), $validated['image_alt'], 360, 'image');
        }

        return redirect()->back()->with('message', 'Отзыв успешно обновлен!');
    }
}

