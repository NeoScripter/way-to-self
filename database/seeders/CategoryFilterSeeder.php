<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Models\CategoryFilter;
use App\Models\Recipe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryFilterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'ПРОТОКОЛЫ ПИТАНИЯ' => [
                'Кето',
                'Веганский',
                'Вегетарианский',
                'Палео',
                'Средиземноморский',
                'Безглютеновый',
                'Низкоуглеводный',
                'Высокобелковый',
            ],
            'Тип блюда' => [
                'Салаты',
                'Супы',
                'Основные блюда',
                'Закуски',
                'Десерты',
                'Выпечка',
                'Напитки',
                'Соусы',
            ],
            'Исключения' => [
                'Без сахара',
                'Без соли',
                'Без молочных',
                'Без орехов',
                'Без сои',
                'Без яиц',
            ],
            'Прием пищи' => [
                'Завтрак',
                'Обед',
                'Ужин',
                'Перекус',
                'Поздний ужин',
                'Полдник',
            ],
        ];

        $filters = collect();

        foreach ($categories as $title => $items) {
            foreach ($items as $item) {
                $filters->push(CategoryFilter::create([
                    'title' => $title,
                    'name' => $item,
                    'category' => CategoryType::RECIPES,
                ]));
            }
        }

        $recipes = Recipe::all();
        if ($recipes->isEmpty() || $filters->isEmpty()) {
            return;
        }

        $filterCount = $filters->count();
        $i = 0;

        foreach ($recipes as $recipe) {
            $recipe->filters()->attach($filters[$i % $filterCount]->id);
            $i++;
        }
    }
}
