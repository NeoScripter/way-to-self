<?php

namespace App\Support;

use Illuminate\Support\Facades\File;

class RecipeInfoFixtures
{
    public static function getFixture(int $id)
    {
        return once(fn () => File::get(database_path('factories/fixtures/recipe-infos/recipe-info-' . $id . '.md')));
    }
}
