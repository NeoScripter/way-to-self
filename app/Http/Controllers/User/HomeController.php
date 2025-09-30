<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\FaqItem;
use App\Models\Plan;
use App\Models\Recipe;
use App\Models\Review;
use App\Models\Video;
use Inertia\Inertia;

final class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $faqs = FaqItem::latest()
            ->where('type', ArticleType::NEWS)
            ->get();

        $reviews = Review::with(['image'])
            ->latest()
            ->get();

        $plans = Plan::with(['image'])
            ->latest()
            ->get();

        $articles = Article::select(['id', 'description', 'title'])
            ->free()
            ->with(['thumbnail'])
            ->latest()
            ->limit(4)
            ->get();

        $recipes = Recipe::select(['id', 'title', 'duration', 'complexity', 'type', 'description'])
            ->free()
            ->with(['image'])
            ->latest()
            ->limit(4)
            ->get();

        $exercises = Exercise::select(['id', 'title', 'duration', 'complexity', 'type', 'description'])
            ->free()
            ->with(['image'])
            ->latest()
            ->limit(4)
            ->get();

        $audio = Audio::with(['image'])
            ->free()
            ->first()
            ->makeHidden(['raw_path', 'original_path', 'hls_path']);

        $video = Video::whereIn('videoable_id', $recipes->pluck('id'))
            ->first()
            ->makeHidden(['video_path']);

        return Inertia::render('user/home', [
            'faqs' => $faqs,
            'reviews' => $reviews,
            'articles' => $articles,
            'plans' => $plans,
            'recipes' => $recipes,
            'exercises' => $exercises,
            'video' => $video->srcVideo(),
            'audio' => $audio,
            'prefix' => 'user.articles.show'
        ]);
    }
}
