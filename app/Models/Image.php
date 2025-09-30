<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    /** @use HasFactory<\Database\Factories\ImageFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }

    protected static function booted(): void
    {
        // Handle storing
        static::creating(function (Image $image) {
            if ($image->path instanceof \Illuminate\Http\UploadedFile) {
                // Store original
                $storedPath = $image->path->store('images');
                $image->path = $storedPath;

                $thumbnail = ImageManager::make(Storage::path($storedPath))
                    ->resize(300, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                $tinyPath = 'images/tiny/' . basename($storedPath);
                Storage::put($tinyPath, (string) $thumbnail->encode());

                $image->tiny_path = $tinyPath;
            }
        });

        static::deleting(function (Image $image) {
            if ($image->path && Storage::exists($image->path)) {
                Storage::delete($image->path);
            }
            if ($image->tiny_path && Storage::exists($image->tiny_path)) {
                Storage::delete($image->tiny_path);
            }
        });
    }
}
