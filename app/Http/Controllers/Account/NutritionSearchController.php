<?php

namespace App\Http\Controllers\Account;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;

class NutritionSearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $search = $request->validate([
            'search' => 'nullable|string',
        ])['search'] ?? null;

        $recipes = Recipe::select(['id', 'description', 'title'])
            ->withSearch($search)
            ->with('image')
            ->get();

        $articles = Article::select(['id', 'description', 'title'])
            ->withSearch($search)
            ->where('type', ArticleType::NUTRITION)
            ->with(['thumbnail'])
            ->get();

        $recipes->each->setAttribute('itemType', 'recipe');
        $articles->each(function ($article) {
            $article->setRelation('image', $article->thumbnail);
            $article->unsetRelation('thumbnail');
            $article->setAttribute('itemType', 'article');
        });

        $items = $recipes->merge($articles)->shuffle();

        $page = (int) request('page', 1);
        $perPage = 16;
        $offset = ($page - 1) * $perPage;

        $paginator = new LengthAwarePaginator(
            $items->slice($offset, $perPage)->values(),
            $items->count(),
            $perPage,
            $page,
            [
                'path'  => request()->url(),
                'query' => request()->query(),
            ]
        );

        return Inertia::render('account/search', [
            'items' => $paginator,
            'routeName' => 'nutrition.search'
        ]);
    }
}
