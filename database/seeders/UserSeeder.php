<?php

namespace Database\Seeders;

use App\Enums\ArticleType;
use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Recipe;
use App\Models\Role;
use App\Models\Tier;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $editorRole = Role::where('name', 'editor')->first();

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ]);
        $admin->roles()->sync([$adminRole->id]);

        User::factory(5)->create()->each(
            fn($editor) =>
            $editor->roles()->sync([$editorRole->id])
        );

        $regularUsers = User::factory(994)->create();

        $withSubscriptions = $regularUsers->random(400);

        $tiers = Tier::all();

        foreach ($withSubscriptions as $user) {
            $pivotData = [
                'expires_at' => now()->addDays(rand(-90, 90)),
            ];

            $randomTiers = $tiers->random(rand(1, 3));
            $randomTiers->each(function ($tier) use ($user, $pivotData) {
                $user->tiers()->attach($tier->id, $pivotData);

                if ($tier->route === 'soul') {
                    $audio = Audio::first();
                    User::toggleFavorite($user, Audio::class, $audio->id);

                    $articles = Article::where('type', ArticleType::SOUL)->latest()->limit(4)->get();

                    $articles->each(function ($article) use ($user) {
                        User::toggleFavorite($user, Article::class, $article->id);
                    });
                } else if ($tier->route === 'food') {
                    $recipes = Recipe::latest()->limit(4)->get();

                    $recipes->each(function ($recipe) use ($user) {
                        User::toggleFavorite($user, Recipe::class, $recipe->id);
                    });

                    $articles = Article::where('type', ArticleType::NUTRITION)->latest()->limit(4)->get();

                    $articles->each(function ($article) use ($user) {
                        User::toggleFavorite($user, Article::class, $article->id);
                    });
                } else {
                    $exercises = Exercise::latest()->limit(4)->get();

                    $exercises->each(function ($exercise) use ($user) {
                        User::toggleFavorite($user, Exercise::class, $exercise->id);
                    });

                    $articles = Article::where('type', ArticleType::EXERCISE)->latest()->limit(4)->get();

                    $articles->each(function ($article) use ($user) {
                        User::toggleFavorite($user, Article::class, $article->id);
                    });
                }
            });
        }
    }
}
