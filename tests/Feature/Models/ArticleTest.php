<?php

use App\Models\Article;

use function Pest\Laravel\get;

it('generates the html', function () {
    $article = Article::factory()->make(['body' => '## Hello world']);

    $article->save();

    expect($article->html)->toEqual(str($article->body)->markdown());
});

it('displays the article items on the home page', function () {
    $articles = Article::factory()
        ->count(4)
        ->sequence(fn ($sequence) => ['title' => 'Hello world '.($sequence->index + 1)])
        ->create();

    $response = get(route('home'));

    $articles->each(fn ($article) => $response->assertSee($article->title));

});

it('displays only the first 4 articles on the home page', function () {
    $articles = Article::factory()
        ->count(10)
        ->sequence(fn ($sequence) => ['title' => 'Hello world '.($sequence->index + 1)])
        ->create();

    $response = get(route('home'));

    $articles->take(4)->each(fn ($article) => $response->assertSee($article->title));

    $articles->skip(4)->each(fn ($article) => $response->assertDontSee($article->title));
});

it('shows only free articles on the main page', function () {
    $freeArticles = Article::factory()->free()->count(2)->create();
    $paidArticles = Article::factory()->paid()->count(2)->create();

    $response = get(route('home'));

    $freeArticles->each(fn ($article) => $response->assertSee($article->title));
    $paidArticles->each(fn ($article) => $response->assertDontSee($article->title));
});

