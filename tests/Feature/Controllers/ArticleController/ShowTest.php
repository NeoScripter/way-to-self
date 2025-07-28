<?php

use App\Models\Article;
use App\Models\Image;

use function Pest\Laravel\get;

it('displays the article to the user', function () {
    $article = Article::factory()
        ->free()
        ->create();

    Image::factory()->create(['imageable_id' => $article, 'type' => "image"]);
    $response = get(route('user.articles.show', $article->id));

    $response->assertOk();

    $response->assertSee($article->title);
    $response->assertSee($article->image->alt);
});

it("doesn't display paid articles", function () {

    $article = Article::factory()->paid()->count(1)->create()->first();

    $response = get(route('user.articles.show', $article->id));

    $response->assertNotFound();
});
