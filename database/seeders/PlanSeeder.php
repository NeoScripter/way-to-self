<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $plans = [
            [
                'title' => 'Точка входа',
                'description' => 'Доступ к одному любому разделу на ваш выбор: Душа, Тело или Питание. Идеально, если хотите начать с конкретного фокуса и протестировать платформу → минимальный шаг, максимум пользы',
                'price' => 2990,
                'path' => 'rate-1.webp',
                'tiny_path' => 'rate-1-tiny.webp',
                'alt' => 'Открытые двери с видом на небо и море — метафора новых возможностей и свободы выбора',
                'tier_count' => 1,
            ],
            [
                'title' => 'Баланс',
                'description' => 'Выбирайте любые два раздела и получайте больше пользы и знаний. Подходит, если вам важна связка, например: питание + движение или тело + эмоции → как комбо-набор заботы о себе',
                'price' => 5980,
                'path' => 'rate-2.webp',
                'tiny_path' => 'rate-2-tiny.webp',
                'alt' => 'Рука складывает камни в японском саду на фоне кругов на песке — символ баланса и сосредоточенности',
                'tier_count' => 2,
            ],
            [
                'title' => 'Целостность',
                'description' => 'Полный доступ ко всем трём разделам. Получайте максимум: все материалы, программы, рекомендации и поддержка в одном потоке → цельная система, которая работает на всех уровнях',
                'price' => 8970,
                'path' => 'rate-3.webp',
                'tiny_path' => 'rate-3-tiny.webp',
                'alt' => 'Женщина на рассвете в лесу с распростёртыми руками — символ внутренней гармонии и пробуждения',
                'tier_count' => 3,
            ],
        ];
        foreach ($plans as $plan) {
            Plan::factory(
                [
                    'title' => $plan['title'],
                    'description' => $plan['description'],
                    'price' => $plan['price'],
                    'tier_count' => $plan['tier_count'],
                ]
            )
                ->afterCreating(function ($planCard) use ($plan) {
                    Image::factory()->create([
                        'imageable_id' => $planCard,
                        'alt' => $plan['alt'],
                        'path' => 'models/plans/' . $plan['path'],
                        'tiny_path' => 'models/plans/' . $plan['tiny_path'],
                    ]);
                })
                ->create();
        }
        $plans = Plan::all()->sortBy('price');
    }
}
