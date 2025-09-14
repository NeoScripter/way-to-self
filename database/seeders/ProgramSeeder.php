<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Image;
use App\Models\Program;
use App\Models\ProgramBlock;
use App\Models\Video;
use App\Support\ProgramFixtures;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programData = ProgramFixtures::getFixtures();

        $programData->each(function (array $raw) {
            Program::factory(
                [
                    'title' => $raw['title'],
                    'description' => $raw['description'],
                    'body' => $raw['body'],
                ]
            )
                ->afterCreating(function ($program) use ($raw) {

                    $img = asset('storage/models/' . $raw['image']);
                    $tinyImg = asset('storage/models/' . $raw['tiny_image']);

                    Image::factory()->create([
                        'imageable_id' => $program,
                        'type' => 'image',
                        'path' => $img,
                        'tiny_path' => $tinyImg,
                    ]);
                    Video::factory()->create([
                        'videoable_id' => $program,
                        'video_path' => 'videos/program.mp4',
                    ]);

                    for ($i = 0; $i < 2; $i++) {
                        $block = ProgramBlock::factory()->create([
                            'program_id' => $program->id,
                        ]);

                        $exercises = Exercise::inRandomOrder()->limit(8)->pluck('id');

                        $block->exercises()->attach($exercises);
                    }
                })
                ->create();
        });
    }
}
