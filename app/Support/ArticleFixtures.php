<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use SplFileInfo;

class ArticleFixtures
{
    public static function getFixtures(): Collection
    {
        return once(fn () => collect(File::files(database_path('factories/fixtures/articles')))
            ->map(fn (SplFileInfo $fileInfo) => $fileInfo->getContents())
            ->map(fn (string $contents) => str($contents)->explode("\n\n", 5))
            ->map(fn (Collection $parts) => [
                'image' => str($parts[0])->trim(),
                'tiny_image' => str($parts[1])->trim(),
                'thumb' => str($parts[0])->trim(),
                'tiny_thumb' => str($parts[1])->trim(),
                'title' => str($parts[2])->trim(),
                'description' => str($parts[3])->trim(),
                'body' => str($parts[4])->trim(),
            ]));
    }
}
