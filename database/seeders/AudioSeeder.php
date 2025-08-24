<?php

namespace Database\Seeders;

use App\Models\Audio;
use App\Models\Image;
use Illuminate\Database\Seeder;

class AudioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Audio::factory()
            ->afterCreating(function ($audio) {
                Image::factory()->create([
                    'imageable_id' => $audio,
                    'type' => 'image',
                    'alt' => 'meditation image',
                    'path' => asset('storage/models/audios/meditation.webp'),
                    'tiny_path' => asset('storage/models/audios/meditation.webp'),
                ]);
            })
            ->create();
    }
}
