<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreArticleRequest;
use App\Http\Requests\Admin\UpdateArticleRequest;
use App\Models\Image;
use App\Models\Article;
use App\Support\SortAndSearchHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $sorting = SortAndSearchHelper::extract($request);

        $sortBy = $sorting['sort_by'];
        $order = $sorting['order'];
        $search = $sorting['search'];
        $options = $sorting['options'];

        $count = Article::all()->count();

        $articles = Article::with(['thumbnail'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('title LIKE ?', ["%{$search}%"]);
                });
            })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();

        return Inertia::render('admin/articles/index', [
            'articles' => fn() => $articles,
            'options' => fn() => $options,
            'count' => fn() => $count,
            'namespace' => fn() => 'nutrition',
        ]);
    }


    public function show(Article $article)
    {
        $count = Article::all()->count();
        $article->load(['image', 'thumbnail']);

        return Inertia::render('admin/articles/show', [
            'article' => fn() => $article,
            'count' => fn() => $count,
            'namespace' => fn() => 'nutrition',
        ]);
    }

    public function create()
    {
        $count = Article::all()->count();

        return Inertia::render('admin/articles/create', [
            'count' => $count,
            'namespace' => fn() => 'nutrition',
        ]);
    }

    public function store(StoreArticleRequest $request)
    {
        $validated = $request->validated();

        $validated['type'] = ArticleType::NUTRITION;


        $article = Article::create(Arr::except($validated, ['image', 'image_alt', 'thumbnail', 'thumbnail_alt']));

        if ($request->hasFile('image')) {
            if ($article->image) {
                $article->image->delete();
            }
            Image::attachTo($article, $request->file('image'), $validated['thumbnail_alt'], 560, 'image');
        }
        if ($request->hasFile('thumbnail')) {
            if ($article->thumbnail) {
                $article->thumbnail->delete();
            }
            Image::attachTo($article, $request->file('thumbnail'), $validated['thumbnail_alt'], 300, 'thumbnail');
        }

        return redirect()->route('admin.nutrition.articles.index')->with('message', 'Статья успешно создана');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('admin.nutrition.articles.index')->with('message', 'Статья успешно удалена');
    }

    public function update(Article $article, UpdateArticleRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['type'] = ArticleType::NUTRITION;

        $article->update(Arr::except($validated, ['image', 'image_alt', 'thumbnail', 'thumbnail_alt']));

        if ($request->hasFile('image')) {
            if ($article->image) {
                $article->image->delete();
            }
            Image::attachTo($article, $request->file('image'), $validated['thumbnail_alt'], 560, 'image');
        }
        if ($request->hasFile('thumbnail')) {
            if ($article->thumbnail) {
                $article->thumbnail->delete();
            }
            Image::attachTo($article, $request->file('thumbnail'), $validated['thumbnail_alt'], 300, 'thumbnail');
        }

        return redirect()->back();
    }
}
