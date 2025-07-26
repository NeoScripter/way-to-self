<?php

use App\Models\Article;

use function Pest\Laravel\get;

it('generates the html', function () {
    $article = Article::factory()->make(['body' => '## Hello world']);

    $article->save();

    expect($article->html)->toEqual(str($article->body)->markdown());
});

it('displays the article items on the home page', function () {
    $article = Article::factory()->make(['title' => 'Hello world']);

    $article->save();

    get(route('home'))->assertSee('Hello world');
});

it('shows only the free articles on the main page', function () {
    Article::factory()->create(['title' => 'This is a free article', 'isPaid' => false]);
    Article::factory()->create(['title' => 'This is a paid article', 'isPaid' => true]);

    get(route('home'))->assertSee('This is a free article')->assertDontSee('This is a paid article');
});


it('shows only the free articles on the articles page', function () {
    Article::factory()->create(['title' => 'This is a free article', 'isPaid' => false]);
    Article::factory()->create(['title' => 'This is a paid article', 'isPaid' => true]);

    get(route('user.articles'))->assertSee('This is a free article')->assertDontSee('This is a paid article');
});

