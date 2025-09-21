<?php

namespace Database\Seeders;

use App\Enums\ArticleType;
use App\Enums\ContentType;
use App\Enums\RoleEnum;
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
        $recentNoSubs = $regularUsers->diff($withSubscriptions)->random(200);
        $oldNoSubs = $regularUsers->diff($withSubscriptions)->diff($recentNoSubs);

        $tiers = Tier::all();

        foreach ($withSubscriptions as $user) {
            $pivotData = [
                'expires_at' => now()->addDays(rand(5, 90)),
            ];

            if (rand(0, 1)) {
                $pivotData['auto_update'] = true;
                $pivotData['auto_update_set_at'] = now()->subDays(rand(0, 40));
            }


            $tier = $tiers->random();
            $user->tiers()->attach($tier->id, $pivotData);

            if ($tier->route === 'soul') {
                $audio = Audio::first();
                User::toggleFavorite($user, Audio::class, $audio->id);

                $articles = Article::where('type', ArticleType::SOUL)->latest()->limit(4)->get();

                $articles->each(function ($article) use ($user) {
                    User::toggleFavorite($user, Article::class, $article->id);
                });
            } else if ($tier->route === 'food') {
                $recipes = Recipe::latest(4)->get();

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
        }

        foreach ($recentNoSubs as $user) {
            $user->update(['created_at' => now()->subDays(rand(0, 14))]);
        }

        foreach ($oldNoSubs as $user) {
            $user->update(['created_at' => now()->subDays(rand(15, 200))]);
        }
    }
}
