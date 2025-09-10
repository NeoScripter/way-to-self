<?php

namespace Database\Factories;

use App\Enums\ContentType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Audio>
 */
class AudioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $filename = 'meditation.mp3';

        return [
            'title' => fake()->word(2),
            'description' => fake()->realText(200),
            'duration' => 5,
            'rating' => fake()->numberBetween(2, 10),
            'original_path' => "public/models/audios/{$filename}",
            'raw_path' => asset("storage/models/audios/{$filename}"),
            'hls_path' => null,
            'type' => ContentType::FREE,
        ];
    }
}
