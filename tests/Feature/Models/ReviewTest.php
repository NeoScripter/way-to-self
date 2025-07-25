<?php

use App\Models\Image;
use App\Models\Review;

use function Pest\Laravel\get;

it('displays the reviews on the home page', function () {
    $review = Review::factory()->create(['body' => 'This is review body']);

    Image::factory()->create(['imageable_id' => $review, 'alt' => "This is image alt"]);

    get(route('home'))->assertSee('This is review body')->assertSee("This is image alt");
});
