<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Program>
 */
class ProgramFactory extends Factory
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
            'body' => Collection::times(3, fn() => fake()->realText(120))->join(PHP_EOL . PHP_EOL),
            'duration' => fake()->numberBetween(15, 240),
            'complexity' => fake()->numberBetween(1, 10),
        ];
    }
}
