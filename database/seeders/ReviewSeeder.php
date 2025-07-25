<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Review;
use App\Support\ReviewFixtures;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reviewData = ReviewFixtures::getFixtures();

        $reviewData->each(function (array $raw) {
            Review::factory(
                [
                    'author' => $raw['author'],
                    'body' => $raw['body'],
                ]
            )
                ->afterCreating(function ($review) use ($raw) {
                    Image::factory()->create([
                        'imageable_id' => $review,
                        'alt' => $raw['alt'],
                        'path' => asset('storage/models/'.$raw['image']),
                    ]);
                })
                ->create();
        });

    }
}
