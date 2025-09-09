<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Practice;
use App\Models\Video;
use App\Support\PracticeFixtures;
use Illuminate\Database\Seeder;

class PracticeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $practiceData = PracticeFixtures::getFixtures();

        for ($i = 0; $i < 6; $i++) {
            $practiceData->each(function (array $raw) {
                Practice::factory(
                    [
                        'title' => $raw['title'],
                        'description' => $raw['description'],
                        'body' => $raw['body'],
                    ]
                )
                    ->afterCreating(function ($audio) {
                        Image::factory()->create([
                            'imageable_id' => $audio,
                            'type' => 'image',
                            'alt' => 'meditation image',
                            'path' => asset('storage/models/practices/practice.webp'),
                            'tiny_path' => asset('storage/models/practices/practice.webp'),
                        ]);
                        Video::factory()->create([
                            'videoable_id' => $audio,
                            'video_path' => 'videos/practice.mp4',
                        ]);
                    })
                    ->create();
            });
        }
    }
}
