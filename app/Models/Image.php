<?php

namespace App\Models;

use App\Services\ImageResizer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
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

    public function getPathAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['path']);
    }

    public function getTinyPathAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['tiny_path']);
    }

    public static function attachTo(Model $model, UploadedFile $file, string $alt, int $size = 400, string $type = 'image'): self
    {
        $paths = app(\App\Services\ImageResizer::class)->handleImage($file, $size);

        $image = new static([
            'type'      => $type,
            'alt'       => $alt,
            'path'      => $paths['original'],
            'tiny_path' => $paths['tiny'],
        ]);

        $model->image()->save($image);

        return $image;
    }

    protected static function booted(): void
    {
        static::deleting(function (Image $image) {
            Storage::disk('public')->delete([
                $image->getRawOriginal('path'),
                $image->getRawOriginal('tiny_path'),
            ]);
        });
    }
}
