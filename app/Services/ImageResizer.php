<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class ImageResizer
{
    public function handleImage(UploadedFile $file, int $size = 400): array
    {
        // Save uploaded file temporarily
        $path = $file->store('uploads', 'public');
        $filename = pathinfo($path, PATHINFO_FILENAME);

        $manager = new ImageManager(new Driver());

        // Create resized versions
        $original = $manager->read($file)->scaleDown(width: $size)->toWebp(80);
        $tiny     = $manager->read($file)->scaleDown(width: 20)->toWebp(80);

        // Final storage paths
        $originalPath = "uploads/{$filename}.webp";
        $tinyPath     = "uploads/{$filename}-tiny.webp";

        // Ensure directory exists
        Storage::disk('public')->makeDirectory('uploads');

        // Save resized images
        Storage::put("public/{$originalPath}", (string) $original);
        Storage::put("public/{$tinyPath}", (string) $tiny);

        // Delete the originally uploaded file (e.g., jpg/png)
        Storage::delete("public/{$path}");

        return [
            'original' => $originalPath,
            'tiny'     => $tinyPath,
        ];
    }
}
