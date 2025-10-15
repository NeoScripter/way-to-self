<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\FaqItem;
use App\Models\HomeEntry;
use App\Models\Overview;
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
            ->get();

        $recipes = Recipe::select(['id', 'title', 'duration', 'complexity', 'type', 'description'])
            ->free()
            ->with(['image'])
            ->latest()
            ->get();

        $exercises = Exercise::select(['id', 'title', 'duration', 'complexity', 'type', 'description'])
            ->free()
            ->with(['image'])
            ->latest()
            ->get();

        $audio = Audio::with('image')
            ->free()
            ->inRandomOrder()
            ->first();

        $overview = Overview::first();
        $video = $overview?->video?->hlsVideo();

        $entries = HomeEntry::all()
            ->map(fn($entry) => [$entry->key => $entry->description])
            ->collapse();

        return Inertia::render('user/home', [
            'faqs' => $faqs,
            'reviews' => $reviews,
            'articles' => $articles,
            'plans' => $plans,
            'recipes' => $recipes,
            'exercises' => $exercises,
            'video' => $video,
            'audio' => $audio,
            'stream' => $audio ? route('audio.stream', ['audio' => $audio->id]) : null,
            'prefix' => 'user.articles.show',
            'entries' => $entries,
        ]);
    }
}
