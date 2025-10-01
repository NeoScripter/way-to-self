<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use Illuminate\Support\Str;

class ImageResizer
{
    public function handleImage(UploadedFile $file, int $size = 400): array
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $filename = Str::slug($originalName) . '-' . uniqid();

        $manager = new ImageManager(new Driver());

        $original = $manager->read($file)->scaleDown(width: $size)->toWebp(80);
        $tiny     = $manager->read($file)->scaleDown(width: 20)->toWebp(80);

        $originalPath = "uploads/{$filename}.webp";
        $tinyPath     = "uploads/{$filename}-tiny.webp";

        Storage::disk('public')->makeDirectory('uploads');

        Storage::disk('public')->put($originalPath, (string) $original);
        Storage::disk('public')->put($tinyPath, (string) $tiny);

        return [
            'original' => $originalPath,   // "uploads/{$filename}.webp"
            'tiny'     => $tinyPath,       // "uploads/{$filename}-tiny.webp"
        ];
    }
}
