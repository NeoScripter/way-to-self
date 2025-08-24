<?php

namespace App\Providers;

use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Recipe;
use App\Models\RecipeInfo;
use App\Models\RecipeStep;
use App\Models\Review;
use App\Models\Tier;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
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
            'tier' => Tier::class,
            'recipe' => Recipe::class,
            'exercise' => Exercise::class,
            'recipe_info' => RecipeInfo::class,
            'recipe_step' => RecipeStep::class,
        ]);
    }
}
