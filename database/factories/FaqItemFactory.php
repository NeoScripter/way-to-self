<?php

namespace Database\Factories;

use App\Enums\ArticleType;
use App\Support\FaqItemFixtures;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Collection;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FaqItem>
 */
class FaqItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => str(fake()->sentence)->beforeLast('.'),
            'body' => Collection::times(3, fn() => fake()->realText(420))->join(PHP_EOL . PHP_EOL),
            'type' => fake()->randomElement([ArticleType::NEWS, ArticleType::EXERCISE, ArticleType::NUTRITION, ArticleType::SOUL]),
        ];
    }

    public function withFixture(): static
    {
        return $this->sequence(...FaqItemFixtures::getFixtures());
    }
}
