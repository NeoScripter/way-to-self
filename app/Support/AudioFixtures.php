<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use SplFileInfo;

class AudioFixtures
{
    public static function getFixtures(): Collection
    {
        return once(fn () => collect(File::files(database_path('factories/fixtures/audios')))
            ->map(fn (SplFileInfo $fileInfo) => $fileInfo->getContents())
            ->map(fn (string $contents) => str($contents)->explode("\n\n", 5))
            ->map(fn (Collection $parts) => [
                'title' => str($parts[0])->trim(),
                'description' => str($parts[1])->trim(),
                'body' => str($parts[2])->trim(),
            ]));
    }
}
