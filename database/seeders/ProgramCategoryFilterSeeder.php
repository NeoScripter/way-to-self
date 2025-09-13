<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoryFilter;
use App\Models\Program;
use App\Enums\CategoryType;

class ProgramCategoryFilterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Цели' => [
                'Похудение',
                'Набор массы',
                'Поддержание формы',
                'Сила',
                'Выносливость',
                'Гибкость',
            ],
            'Длительность' => [
                '1 неделя',
                '2 недели',
                '1 месяц',
                '3 месяца',
                '6 месяцев',
            ],
            'Уровень сложности' => [
                'Начальный',
                'Средний',
                'Продвинутый',
            ],
            'Тип программы' => [
                'Домашняя',
                'Тренажерный зал',
                'Смешанная',
            ],
        ];

        $filters = collect();

        foreach ($categories as $title => $items) {
            foreach ($items as $item) {
                $filters->push(CategoryFilter::create([
                    'title' => $title,
                    'name' => $item,
                    'category' => CategoryType::PROGRAMS,
                ]));
            }
        }

        $programs = Program::all();
        if ($programs->isEmpty() || $filters->isEmpty()) {
            return;
        }

        $filterCount = $filters->count();
        $i = 0;

        foreach ($programs as $program) {
            $program->filters()->attach($filters[$i % $filterCount]->id);
            $i++;
        }
    }
}
