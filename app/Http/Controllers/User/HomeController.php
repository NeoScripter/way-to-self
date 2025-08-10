<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\FaqItem;
use App\Models\Review;
use App\Models\Video;
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
        $video = Video::all()->first();

        $playlistUrl = route('hls.playlist', [
            'model' => 'video',
            'id' => $video->id,
            'playlist' => 'playlist.m3u8',
        ]);

        return Inertia::render('user/home', [
            'faqs' => $faqs,
            'reviews' => $reviews,
            'articles' => $articles,
            'video' => $playlistUrl,
        ]);
    }
}
