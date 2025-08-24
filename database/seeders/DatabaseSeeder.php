<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use App\Models\Audio;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Джон',
            'surname' => 'Доу',
            'email' => 'test@gmail.com',
            'telegram' => '@johndoe187',
        ]);

        $this->call(FaqItemSeeder::class);
        $this->call(ReviewSeeder::class);
        $this->call(ArticleSeeder::class);
        $this->call(TierSeeder::class);
        $this->call(RecipeSeeder::class);
        $this->call(ExerciseSeeder::class);
        $this->call(AudioSeeder::class);

        $audio = Audio::first();
        $user->favoriteAudio()->attach($audio->id);
        $article = Article::first();
        $user->favoriteArticles()->attach($article->id);
    }
}
