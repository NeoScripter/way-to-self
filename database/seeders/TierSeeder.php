<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Tier;
use App\Models\User;
use Illuminate\Database\Seeder;

class TierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $tierImages = [
            'soul' => ['tiers-soul.webp', 'tiers-soul-tiny.webp'],
            'food' => ['tiers-food.webp', 'tiers-food-tiny.webp'],
            'sport' => ['tiers-sport.webp', 'tiers-sport-tiny.webp'],
        ];

        $tiers = [
            [
                'name' => 'Душа',
                'description' => 'Если вы часто испытываете стресс, сталкиваетесь с проблемами со сном, ваши мысли постоянно кружатся в голове, и вы чувствуете нервозность и беспокойство, ищите душевный баланс — этот раздел создан для вас.',
                'price' => 2990,
                'image_key' => 'soul',
                'route' => 'soul',
                'alt' => 'Девушка в позе лотоса медитирует, сидя на полу в зелёной спортивной одежде',
            ],
            [
                'name' => 'Питание',
                'description' => 'Если вы сталкиваетесь с избыточным весом, проблемами ЖКТ и общими сложностями со здоровьем, нутрициолог предложил вам план питания, но рецептов недостаточно и их сложно организовать, и вы ищете идеи для здоровых и питательных блюд — этот раздел для вас.',
                'price' => 2990,
                'image_key' => 'food',
                'route' => 'nutrition',
                'alt' => 'Зелёная миска, наполненная свежим овощным салатом с помидорами, огурцами и зеленью',
            ],
            [
                'name' => 'Тело',
                'description' => 'Если у вас нет времени на поддержание физической активности, но вы хотите поддерживать свое тело в хорошей форме, испытываете одышку при активности, плохое самочувствие без особых причин, страдаете от избыточного веса и ощущения скованности и прочего — этот раздел создан для вас.',
                'price' => 2990,
                'image_key' => 'sport',
                'route' => 'body',
                'alt' => 'Пара зелёных гантелей для фитнеса',
            ],
        ];
        foreach ($tiers as $tier) {
            $images = $tierImages[$tier['image_key']];

            Tier::factory(
                [
                    'name' => $tier['name'],
                    'description' => $tier['description'],
                    'route' => $tier['route'],
                    'price' => $tier['price'],
                ]
            )
                ->afterCreating(function ($tierCard) use ($tier, $images) {
                    Image::factory()->create([
                        'imageable_id' => $tierCard,
                        'alt' => $tier['alt'],
                        'path' => asset('storage/tiers/' . $images[0]),
                        'tiny_path' => asset('storage/tiers/' . $images[1]),
                    ]);
                })
                ->create();
        }
        $user = User::all()->first();
        $tier = Tier::all()->first();

        $user->tiers()->attach($tier->id, [
            'purchased_at' => now()
        ]);
    }
}
