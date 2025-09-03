<?php

namespace Database\Seeders;

use App\Enums\ArticleType;
use App\Models\FaqItem;
use Illuminate\Database\Seeder;

class FaqItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = collect([
            ArticleType::NEWS,
            ArticleType::EXERCISE,
            ArticleType::NUTRITION,
            ArticleType::SOUL,
        ]);

        $types->each(function (ArticleType $type) {
            FaqItem::factory()
                ->count(6)
                ->state(['type' => $type])
                ->withFixture()
                ->create();
        });
    }
}
