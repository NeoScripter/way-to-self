<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use SplFileInfo;

class ExerciseFixtures
{
    public static function getFixtures(): Collection
    {
        return once(fn () => collect(File::files(database_path('factories/fixtures/exercises')))
            ->map(fn (SplFileInfo $fileInfo) => $fileInfo->getContents())
            ->map(fn (string $contents) => str($contents)->explode("\n\n\n"))
            ->map(fn (Collection $parts) => [
                'image' => str($parts[0])->trim(),
                'tiny_image' => str($parts[1])->trim(),
                'category' => str($parts[2])->trim(),
                'title' => str($parts[3])->trim(),
                'description' => str($parts[4])->trim(),
                'body' => str($parts[5])->trim(),
            ]));
    }
}
