<?php

namespace App\Http\Controllers\Account;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BodyArticleController extends Controller
{
    public function index()
    {
        $articles = Article::select(['id', 'description', 'title'])
            ->where('type', ArticleType::EXERCISE)
            ->with(['thumbnail'])
            ->paginate(16);

        return Inertia::render('account/articles', [
            'articles' => $articles,
            'prefix' => 'body.articles.show',
            'labels' => ['Главная', 'Тело', 'Советы']
        ]);
    }

    public function show(Article $article)
    {
        $user = Auth::user();
        $article->load(['image']);

        $isFavorite = $article->favoritedBy()->where('user_id', $user->id)->exists();

        return Inertia::render('account/article', [
            'article' => $article,
            'isFavorite' => $isFavorite,
            'labels' => ['Главная', 'Тело', 'Советы']
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = Auth::user();

        User::toggleFavorite($user, Article::class, $id);

        return redirect()->back();
    }
}
