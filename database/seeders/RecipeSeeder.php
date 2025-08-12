<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Recipe;
use App\Models\RecipeCategory;
use App\Models\RecipeInfo;
use App\Models\RecipeStep;
use App\Models\Video;
use App\Support\RecipeFixtures;
use App\Support\RecipeInfoFixtures;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipeData = RecipeFixtures::getFixtures();

        for ($i = 0; $i < 1; $i++) {
            $recipeData->each(function (array $raw) {
                Recipe::factory(
                    [
                        'title' => $raw['title'],
                        'description' => $raw['description'],
                    ]
                )
                    ->free()
                    ->afterCreating(function ($recipe) use ($raw) {

                        $img = asset('storage/models/' . $raw['image']);
                        $tinyImg = asset('storage/models/' . $raw['tiny_image']);

                        Image::factory()->create([
                            'imageable_id' => $recipe,
                            'type' => 'image',
                            'path' => $img,
                            'tiny_path' => $tinyImg,
                        ]);
                        Video::factory()->create([
                            'videoable_id' => $recipe,
                        ]);

                        $this->createRecipeInfos($recipe->id);

                        RecipeCategory::factory([
                            'recipe_id' => $recipe->id,
                            'name' => $raw['category'],
                        ])->create();

                        for ($i = 1; $i <= 4; $i++) {
                            $this->createRecipeSteps($recipe->id, $raw['step' . $i], $img, $tinyImg, $i);
                        }

                    })
                    ->create();
            });

        }

    }

    protected function createRecipeSteps(int $recipe_id, string $body, string $img, string $tinyImg, int $i)
    {
        if ($i > 1) {
            RecipeStep::factory([
                'body' => $body,
                'order' => $i,
                'recipe_id' => $recipe_id,
            ])->afterCreating(function ($recipeStep) use ($img, $tinyImg) {
                Image::factory()->create([
                    'imageable_id' => $recipeStep,
                    'type' => 'image',
                    'path' => $img,
                    'tiny_path' => $tinyImg,
                ]);
            })->create();

        } else {
            RecipeStep::factory([
                'body' => $body,
                'order' => $i,
                'recipe_id' => $recipe_id,
            ])->create();
        }
    }

    protected function createRecipeInfos(int $recipe_id)
    {
        $recipeInfoTitles = [
            'Ингредиенты',
            'Оборудование для приготовления',
            'Витамины и минералы',
            'Пищевая ценность',
        ];

        $infos = [];

        for ($i = 1; $i <= 4; $i++) {
            if ($i === 3) {
                $info = RecipeInfo::factory([
                    'title' => $recipeInfoTitles[$i - 1],
                    'order' => $i,
                    'recipe_id' => $recipe_id,
                ])->afterCreating(function ($recipeInfo) {
                    Image::factory()->create([
                        'imageable_id' => $recipeInfo,
                        'type' => 'image',
                        'path' => asset('storage/models/recipes/recipe-info.webp'),
                        'tiny_path' => asset('storage/models/recipes/recipe-info-tiny.webp'),
                    ]);
                })->create();

            } else {
                $data = RecipeInfoFixtures::getFixture($i);
                $info = RecipeInfo::factory([
                    'title' => $recipeInfoTitles[$i - 1],
                    'body' => $data,
                    'order' => $i,
                    'recipe_id' => $recipe_id,
                ])->create();

            }

            $infos[] = $info;
        }

        return $infos;
    }
}
