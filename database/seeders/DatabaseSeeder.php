<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FaqItemSeeder::class);
        $this->call(ReviewSeeder::class);
        $this->call(ArticleSeeder::class);
        $this->call(RecipeSeeder::class);
        $this->call(ExerciseSeeder::class);
        $this->call(AudioSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(TierSeeder::class);
        $this->call(PracticeSeeder::class);
        $this->call(RecipeCategoryFilterSeeder::class);
        $this->call(PracticeCategoryFilterSeeder::class);
        $this->call(AudioCategoryFilterSeeder::class);
        $this->call(ExerciseCategoryFilterSeeder::class);
        $this->call(ProgramCategoryFilterSeeder::class);
    }
}
