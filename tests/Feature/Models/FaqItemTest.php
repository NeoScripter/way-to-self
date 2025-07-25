<?php

use App\Models\FaqItem;

it('generates the html', function() {
    $faq = FaqItem::factory()->make(['body' => '## Hello world']);

    $faq->save();

    expect($faq->html)->toEqual(str($faq->body)->markdown());
});
