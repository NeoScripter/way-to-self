<?php

use App\Models\Image;
use App\Models\Recipe;

use function Pest\Laravel\get;

it('displays the recipe to the user', function () {
    $recipe = Recipe::factory()
        ->free()
        ->create();

    Image::factory()->create(['imageable_id' => $recipe]);
    $response = get(route('user.recipes.show', $recipe->id));

    $response->assertOk();

    $response->assertSee($recipe->title);
    $response->assertSee($recipe->image->alt);
});

it("doesn't display paid recipes", function () {

    $recipe = Recipe::factory()->paid()->count(1)->create()->first();

    $response = get(route('user.recipes.show', $recipe->id));

    $response->assertNotFound();
});
