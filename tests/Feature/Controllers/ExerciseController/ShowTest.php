<?php

use App\Models\Image;
use App\Models\Exercise;

use function Pest\Laravel\get;

it('displays the exercise to the user', function () {
    $exercise = Exercise::factory()
        ->free()
        ->create();

    Image::factory()->create(['imageable_id' => $exercise]);
    $response = get(route('user.exercises.show', $exercise->id));

    $response->assertOk();

    $response->assertSee($exercise->title);
    $response->assertSee($exercise->image->alt);
});

it("doesn't display paid exercises", function () {

    $exercise = Exercise::factory()->paid()->count(1)->create()->first();

    $response = get(route('user.exercises.show', $exercise->id));

    $response->assertNotFound();
});
