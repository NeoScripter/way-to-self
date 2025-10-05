<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;


class ArticleController extends Controller
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
            'count' => fn() => $count
        ]);
    }


    public function show(Article $article)
    {
        $count = Article::all()->count();
        $article->load(['image', 'thumbnail']);

        $options = [
            ['value' => ArticleType::NEWS,  'label' => 'Новости'],
            ['value' => ArticleType::EXERCISE,  'label' => 'Тело'],
            ['value' => ArticleType::SOUL,  'label' => 'Душа'],
            ['value' => ArticleType::NUTRITION,  'label' => 'Питание'],
        ];

        return Inertia::render('admin/articles/show', [
            'article' => fn() => $article,
            'count' => fn() => $count,
            'options' => fn() => $options,
        ]);
    }

    public function create()
    {
        $count = Article::all()->count();
        $options = [
            ['value' => ArticleType::NEWS,  'label' => 'Новости'],
            ['value' => ArticleType::EXERCISE,  'label' => 'Тело'],
            ['value' => ArticleType::SOUL,  'label' => 'Душа'],
            ['value' => ArticleType::NUTRITION,  'label' => 'Питание'],
        ];

        return Inertia::render('admin/articles/create', [
            'count' => $count,
            'options' => $options,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:120',
            'description' => 'required|string|max:500',
            'body' => 'required|string|max:64000',
            'type' => ['required', new Enum(ArticleType::class)],
            'image_alt'         => 'required|string|max:400',
            'thumbnail_alt'         => 'required|string|max:400',
            'image'       => 'required|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'thumbnail'       => 'required|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
        ]);

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

        return redirect()->route('admin.articles.index')->with('message', 'Статья успешно создана');
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('admin.articles.index')->with('message', 'Статья успешно удалена');
    }

    public function update(Article $article, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:120',
            'description' => 'required|string|max:500',
            'body' => 'required|string|max:64000',
            'type' => ['required', new Enum(ArticleType::class)],
            'image_alt'         => 'required|string|max:400',
            'thumbnail_alt'         => 'required|string|max:400',
            'image'       => 'nullable|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
            'thumbnail'       => 'nullable|mimes:jpg,jpeg,png,bmp,webp,svg|max:20480',
        ]);

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
