<?php

namespace App\Http\Controllers\Account;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Audio;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;

class SoulSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $search = $request->validate([
            'search' => 'nullable|string',
        ])['search'] ?? null;

        $audios = Audio::select(['id', 'description', 'title'])
            ->withSearch($search)
            ->with('image')
            ->get();

        $articles = Article::select(['id', 'description', 'title'])
            ->withSearch($search)
            ->where('type', ArticleType::SOUL)
            ->with(['thumbnail'])
            ->get();

        $audios->each->setAttribute('itemType', 'audio');
        $articles->each(function ($article) {
            $article->setRelation('image', $article->thumbnail);
            $article->unsetRelation('thumbnail');
            $article->setAttribute('itemType', 'article');
        });

        $items = $audios->merge($articles)->shuffle();

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
            'routeName' => 'soul.search'
        ]);
    }
}
