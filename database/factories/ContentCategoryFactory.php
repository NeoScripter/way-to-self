<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ContentCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'categorizable_type' => $this->categorizableType(...),
            'categorizable_id' => Recipe::factory(),
        ];
    }

    protected function categorizableType(array $values)
    {
        $type = $values['categorizable_id'];
        $modelName = $type instanceof Factory ? $type->modelName() : $type::class;

        return (new $modelName)->getMorphClass();
    }
}
