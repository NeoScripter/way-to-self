<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoryFilter;
use App\Models\Exercise;
use App\Models\Program;
use App\Enums\CategoryType;

class ExerciseCategoryFilterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Тип упражнения' => [
                'Силовые',
                'Кардио',
                'Растяжка',
            ],
            'Инвентарь' => [
                'Без оборудования',
                'Гантели',
                'Штанга',
            ],
            'Уровень сложности' => [
                'Начальный',
                'Средний',
                'Продвинутый',
            ],
        ];

        $filters = collect();

        foreach ($categories as $title => $items) {
            foreach ($items as $item) {
                $filters->push(CategoryFilter::create([
                    'title' => $title,
                    'name' => $item,
                    'category' => CategoryType::EXERCISES,
                ]));
            }
        }

        $exercises = Exercise::all();
        if ($exercises->isEmpty() || $filters->isEmpty()) {
            return;
        }

        $filterCount = $filters->count();
        $i = 0;

        foreach ($exercises as $exercise) {
            $exercise->filters()->attach($filters[$i % $filterCount]->id);
            $i++;
        }
    }
}
