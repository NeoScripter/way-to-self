<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use SplFileInfo;

class LegalInfoFixtures
{
    public static function getFixtures(): Collection
    {
        return once(fn () => collect(File::files(database_path('factories/fixtures/legal-infos')))
            ->map(fn (SplFileInfo $fileInfo) => $fileInfo->getContents())
            ->map(fn (string $contents) => str($contents)->explode("\n\n", 3))
            ->map(fn (Collection $parts) => [
                'key' => str($parts[0])->trim(),
                'title' => str($parts[1])->trim(),
                'body' => str($parts[2])->trim(),
            ]));
    }
}
