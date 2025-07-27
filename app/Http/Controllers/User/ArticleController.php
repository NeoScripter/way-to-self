<?php

namespace App\Http\Controllers\User;

use App\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index() {
        $articles = Article::where('type', ArticleType::NEWS)->get();

        return Inertia::render('user/articles', [
            'articles' => $articles
        ]);
    }

    public function show() {

    }
}
