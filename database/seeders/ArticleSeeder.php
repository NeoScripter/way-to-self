<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Image;
use App\Support\ArticleFixtures;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articleData = ArticleFixtures::getFixtures();

        $articleData->each(function (array $raw) {
            article::factory(
                [
                    'title' => $raw['title'],
                    'description' => $raw['description'],
                    'body' => $raw['body'],
                ]
            )
                ->afterCreating(function ($article) use ($raw) {
                    Image::factory()->create([
                        'imageable_id' => $article,
                        'type' => 'image',
                        'alt' => $raw['description'],
                        'path' => asset('storage/models/'.$raw['image']),
                        'tiny_path' => asset('storage/models/'.$raw['tiny_image']),
                    ]);
                    Image::factory()->create([
                        'imageable_id' => $article,
                        'type' => 'thumbnail',
                        'alt' => $raw['description'],
                        'path' => asset('storage/models/'.$raw['thumb']),
                        'tiny_path' => asset('storage/models/'.$raw['tiny_thumb']),
                    ]);

                })
                ->create();
        });

    }
}
