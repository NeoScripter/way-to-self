<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Models\CategoryFilter;
use App\Models\Practice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PracticeCategoryFilterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'ВИДЫ ПРАКТИК' => [
                'Утренние',
                'Дневные',
                'Вечерние',
            ],
        ];

        $filters = collect();

        foreach ($categories as $title => $items) {
            foreach ($items as $item) {
                $filters->push(CategoryFilter::create([
                    'title' => $title,
                    'name' => $item,
                    'category' => CategoryType::PRACTICES,
                ]));
            }
        }

        $practices = Practice::all();
        if ($practices->isEmpty() || $filters->isEmpty()) {
            return;
        }

        $filterCount = $filters->count();
        $i = 0;

        foreach ($practices as $practice) {
            $practice->filters()->attach($filters[$i % $filterCount]->id);
            $i++;
        }
    }
}
