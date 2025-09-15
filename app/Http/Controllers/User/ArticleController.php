<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::select(['id', 'description', 'title'])->free()->with(['thumbnail'])->paginate(16);

        return Inertia::render('user/articles', [
            'articles' => $articles,
            'prefix' => 'user.articles.show'
        ]);
    }

    public function show(Article $article)
    {
        abort_unless($article->isFree(), 404);
        $user = Auth::user();

        $isFavorite = $user ? $article->favoritedBy()->where('user_id', $user->id)->exists() : null;

        $article->load(['image']);

        return Inertia::render('user/article', [
            'isFavorite' => $isFavorite,
            'article' => $article,
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = Auth::user();

        User::toggleFavorite($user, Article::class, $id);

        return redirect()->back();
    }
}
