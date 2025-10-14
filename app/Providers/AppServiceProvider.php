<?php

namespace App\Providers;

use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Practice;
use App\Models\Program;
use App\Models\Recipe;
use App\Models\RecipeInfo;
use App\Models\RecipeStep;
use App\Models\Review;
use App\Models\Tier;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use AhoCorasick\MultiStringMatcher;
use App\Models\HeroVideo;
use App\Models\Overview;
use App\Models\Plan;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(MultiStringMatcher::class, function ($app) {
            $words = config('profanity.words');
            return new MultiStringMatcher($words);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::unguard();

        Relation::enforceMorphMap([
            'review' => Review::class,
            'audio' => Audio::class,
            'article' => Article::class,
            'practice' => Practice::class,
            'program' => Program::class,
            'tier' => Tier::class,
            'recipe' => Recipe::class,
            'plan' => Plan::class,
            'exercise' => Exercise::class,
            'recipe_info' => RecipeInfo::class,
            'recipe_step' => RecipeStep::class,
            'overview' => Overview::class,
        ]);
    }
}
