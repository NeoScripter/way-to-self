<?php

namespace Database\Factories;

use App\Enums\ContentType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Collection;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exercise>
 */
class ExerciseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(5, true),
            'description' => fake()->sentences(2, true),
            'body' => Collection::times(3, fn () => fake()->realText(120))->join(PHP_EOL . PHP_EOL),
            'duration' => fake()->numberBetween(15, 240),
            'rating' => fake()->numberBetween(1, 10),
        ];
    }

    public function free(): static
    {
        return $this->state(['type' => ContentType::FREE]);
    }

    public function paid(): static
    {
        return $this->state(['type' => ContentType::FREE]);
    }
}
