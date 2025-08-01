<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\FaqItem;
use App\Models\Review;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $faqs = FaqItem::latest()->get();
        $reviews = Review::with(['image'])->latest()->get();
        $articles = Article::select(['id', 'description', 'title'])->free()->with(['thumbnail'])->latest()->limit(4)->get();

        return Inertia::render('user/home', [
            'faqs' => $faqs,
            'reviews' => $reviews,
            'articles' => $articles,
        ]);
    }
}
