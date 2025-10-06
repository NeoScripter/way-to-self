<?php

namespace Database\Seeders;

use App\Models\Audio;
use App\Models\Image;
use App\Support\AudioFixtures;
use Illuminate\Database\Seeder;

class AudioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $audioData = AudioFixtures::getFixtures();

        for ($i = 0; $i < 6; $i++) {
            $audioData->each(function (array $raw) {
                Audio::factory(
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
                            'path' => 'models/audios/meditation.webp',
                            'tiny_path' => 'models/audios/meditation.webp',
                        ]);
                    })
                    ->create();
            });
        }
    }
}
