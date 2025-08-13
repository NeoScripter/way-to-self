<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\ExerciseCategory;
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
            $exerciseData->each(function (array $raw) {
                Exercise::factory(
                    [
                        'title' => $raw['title'],
                        'description' => $raw['description'],
                        'body' => $raw['body'],
                    ]
                )
                    ->free()
                    ->afterCreating(function ($exercise) use ($raw) {

                        $img = asset('storage/models/' . $raw['image']);
                        $tinyImg = asset('storage/models/' . $raw['tiny_image']);

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

                        ExerciseCategory::factory([
                            'exercise_id' => $exercise->id,
                            'name' => $raw['category'],
                        ])->create();

                    })
                    ->create();
            });

        }

    }
}
