<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'videoable_type' => $this->videoableType(...),
            'video_path' => 'videos/recipe.mp4',
        ];
    }

    protected function videoableType(array $values)
    {
        $type = $values['videoable_id'];
        $modelName = $type instanceof Factory ? $type->modelName() : $type::class;

        return (new $modelName)->getMorphClass();
    }
}
