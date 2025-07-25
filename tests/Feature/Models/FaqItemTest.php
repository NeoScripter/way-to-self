<?php

use App\Models\FaqItem;

use function Pest\Laravel\get;

it('generates the html', function () {
    $faq = FaqItem::factory()->make(['body' => '## Hello world']);

    $faq->save();

    expect($faq->html)->toEqual(str($faq->body)->markdown());
});

it('displays the faq items on the home page', function () {
    $faq = FaqItem::factory()->make(['title' => 'Hello world']);

    $faq->save();

    get(route('home'))->assertSee('Hello world');
});
