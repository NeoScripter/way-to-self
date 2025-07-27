<?php

use App\Models\Article;

use function Pest\Laravel\get;

it('displays articles on the public article page', function () {
    $freeArticles = Article::factory()
        ->free()
        ->count(5)
        ->sequence(fn ($sequence) => ['title' => 'Article Title  '.($sequence->index + 1)])
        ->create();

    $response = get(route('user.articles.index'));

    $freeArticles->each(fn ($article) => (
        $response->assertSee($article->title)
    ));

});

it('shows only the free articles on the articles page', function () {
    $freeArticles = Article::factory()
        ->free()
        ->count(5)
        ->sequence(fn ($sequence) => ['title' => 'Article Title  '.($sequence->index + 1)])
        ->create();

    $paidArticles = Article::factory()
        ->paid()
        ->count(5)
        ->sequence(fn ($sequence) => ['title' => 'Article Title  '.($sequence->index + count($freeArticles))])
        ->create();

    $response = get(route('user.articles.index'));

    $freeArticles->each(fn ($article) => (
        $response->assertSee($article->title)
    ));

    $paidArticles->each(fn ($article) => (
        $response->assertDontSee($article->title)
    ));
});

it('paginates articles on the public article page', function () {
    // TODO
    return true;
});
