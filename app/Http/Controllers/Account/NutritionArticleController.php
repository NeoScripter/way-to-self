<?php

namespace App\Http\Controllers\Account;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionArticleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $articles = Article::select(['id', 'description', 'title'])
            ->where('type', ArticleType::NUTRITION)
            ->with(['thumbnail'])
            ->paginate(16);

        return Inertia::render('account/articles', [
            'articles' => $articles,
            'prefix' => 'nutrition.articles.show'
        ]);
    }

    public function show(Article $article)
    {
        $article->load(['image']);

        return Inertia::render('account/article', [
            'article' => $article,
        ]);
    }
}
