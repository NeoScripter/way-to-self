<?php

use function Pest\Laravel\get;

it('successfully opens the tier page', function () {

    $response = get(route('tiers.index'));

    $response->assertOk();
    $response->assertSeeText("Выберите разделы");
});
