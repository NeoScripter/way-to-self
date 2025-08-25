<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Джон',
            'surname' => 'Доу',
            'email' => 'test@gmail.com',
            'telegram' => '@johndoe187',
        ]);

        $audio = Audio::first();
        $user->favoriteAudio()->attach($audio->id);
        $articles = Article::latest()->limit(4)->get();

        $articles->each(function ($article) use ($user) {
            $user->favoriteArticles()->attach($article->id);
        });

        $exercises = Exercise::latest()->limit(4)->get();

        $exercises->each(function ($exercise) use ($user) {
            $user->favoriteExercises()->attach($exercise->id);
        });

        $recipes = Recipe::latest()->latest(4)->get();

        $recipes->each(function ($recipe) use ($user) {
            $user->favoriteRecipes()->attach($recipe->id);
        });
    }
}
