<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Models\CategoryFilter;
use App\Models\Audio;
use Illuminate\Database\Seeder;

class AudioCategoryFilterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'МЕДИТАЦИИ' => [
                'На мантру',
                'На объект',
                'На осознанность',
                'На сон',
                'Кундалини йога',
            ],
        ];

        $filters = collect();

        foreach ($categories as $title => $items) {
            foreach ($items as $item) {
                $filters->push(CategoryFilter::create([
                    'title' => $title,
                    'name' => $item,
                    'category' => CategoryType::AUDIOS,
                ]));
            }
        }

        $audios = Audio::all();
        if ($audios->isEmpty() || $filters->isEmpty()) {
            return;
        }

        $filterCount = $filters->count();
        $i = 0;

        foreach ($audios as $audio) {
            $audio->filters()->attach($filters[$i % $filterCount]->id);
            $i++;
        }
    }
}
