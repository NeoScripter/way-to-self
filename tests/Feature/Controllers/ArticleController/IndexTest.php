<?php

use App\Enums\ArticleType;
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
        ->sequence(fn ($sequence) => [
            'title' => 'Free Article '.($sequence->index + 1),
        ])
        ->create();

    $paidArticles = Article::factory()
        ->paid()
        ->count(5)
        ->sequence(fn ($sequence) => [
            'title' => 'Paid Article '.($sequence->index + 1),
        ])
        ->create();

    $response = get(route('user.articles.index'));

    $freeArticles->each(fn ($article) => $response->assertSee($article->title)
    );

    $paidArticles->each(fn ($article) => $response->assertDontSee($article->title)
    );
});

it('paginates articles on the public article page', function () {
    $articles = Article::factory()
        ->free()
        ->count(40)
        ->sequence(fn ($sequence) => ['title' => 'title ' . $sequence->index])
        ->create();

    $response = get(route('user.articles.index'));

    $articles->take(16)->each(fn ($article) => $response->assertSee($article->title));
    $articles->skip(16)->each(fn ($article) => $response->assertDontSee($article->title));
});
