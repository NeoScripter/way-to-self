<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::select(['id', 'description', 'title'])->free()->with(['thumbnail'])->paginate(16);

        return Inertia::render('user/articles', [
            'articles' => $articles,
        ]);
    }

    public function show(Article $article)
    {
        abort_unless($article->isFree(), 404);

        $article->load(['image']);

        return Inertia::render('user/article', [
            'article' => $article,
        ]);
    }
}
