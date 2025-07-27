<?php

namespace App\Http\Controllers\User;

use App\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index() {
        $articles = Article::select(['id', 'description', 'title'])->where('type', ArticleType::NEWS)->with(['thumbnail'])->paginate(16);

        return Inertia::render('user/articles', [
            'articles' => $articles
        ]);
    }

    public function show() {

    }
}
