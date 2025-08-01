<?php

namespace Database\Factories;

use App\ArticleType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Collection;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->sentence(20),
            'body' => Collection::times(3, fn () => fake()->realText(120))->join(PHP_EOL.PHP_EOL),
            'type' => ArticleType::NEWS,
        ];
    }

    public function free(): static
    {
        return $this->state(['type' => ArticleType::NEWS]);
    }

    public function paid(): static
    {
        return $this->state(['type' => ArticleType::SOUL]);
    }
}
