<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Models\ContentCategory;
use App\Models\Exercise;
use App\Models\Image;
use App\Models\Video;
use App\Support\ExerciseFixtures;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exerciseData = ExerciseFixtures::getFixtures();

        for ($i = 0; $i < 1; $i++) {
            $exerciseData->slice(0, 2)->each(function (array $raw) {
                Exercise::factory(
                    [
                        'title' => $raw['title'],
                        'description' => $raw['description'],
                        'body' => $raw['body'],
                    ]
                )
                    ->free()
                    ->afterCreating(function ($exercise) use ($raw) {

                        $img = 'models/' . $raw['image'];
                        $tinyImg = 'models/' . $raw['tiny_image'];

                        Image::factory()->create([
                            'imageable_id' => $exercise,
                            'type' => 'image',
                            'path' => $img,
                            'tiny_path' => $tinyImg,
                        ]);
                        Video::factory()->create([
                            'videoable_id' => $exercise,
                            'video_path' => 'videos/exercise.mp4',
                        ]);

                        ContentCategory::factory([
                            'categorizable_id' => $exercise,
                            'name' => $raw['category'],
                        ])->create();

                    })
                    ->create();
            });

        }

    }
}
