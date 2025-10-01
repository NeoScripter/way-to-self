<?php

namespace App\Models;

use App\Services\ImageResizer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
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

    protected static function booted(): void
    {
        // static::saving(function (Image $image) {
        //     if ($image->path instanceof \Illuminate\Http\UploadedFile) {

        //         $paths = app(ImageResizer::class)->handleImage($image->path);

        //         $image->path = $paths['original'];
        //         $image->tiny_path = $paths['tiny'];
        //     }
        // });

        // static::deleting(function (Image $image) {
        //     Storage::disk('public')->delete([$image->path, $image->tiny_path]);
        // });

        static::deleting(function (Image $image) {
            Storage::disk('public')->delete([
                $image->getRawOriginal('path'),
                $image->getRawOriginal('tiny_path'),
            ]);
        });
    }
}
