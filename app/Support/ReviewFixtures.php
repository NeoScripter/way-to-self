<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use SplFileInfo;

class ReviewFixtures
{
    public static function getFixtures(): Collection
    {
        return once(fn () => collect(File::files(database_path('factories/fixtures/reviews')))
            ->map(fn (SplFileInfo $fileInfo) => $fileInfo->getContents())
            ->map(fn (string $contents) => str($contents)->explode("\n\n", 4))
            ->map(fn (Collection $parts) => [
                'image' => str($parts[0])->trim(),
                'alt' => str($parts[1])->trim(),
                'author' => str($parts[2])->trim(),
                'body' => str($parts[3])->trim(),
            ]));
    }
}
