<?php

namespace App\Models;

use AchyutN\LaravelHLS\Traits\ConvertsToHLS;
use App\Services\VideoResizer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use ConvertsToHls, HasFactory;

    protected $casts = [
        'conversion_progress' => 'integer',
    ];

    public function hlsVideo()
    {
        return route('hls.playlist', [
            'model' => 'video',
            'id' => $this->id,
            'playlist' => 'playlist.m3u8',
        ]);
    }

    public static function attachTo(Model $model, UploadedFile $file, int $width = 1320): self
    {
        // Compress and convert video to WebM
        $paths = app(VideoResizer::class)->handleVideo($file, $width);

        $video = new static([
            'video_path' => $paths['original'],
        ]);

        $model->video()->save($video);

        return $video;
    }

    public function srcVideo(): ?string
    {
        return $this->video_path;
    }

    public function videoable(): MorphTo
    {
        return $this->morphTo();
    }

    public function getVideoPathAttribute(): ?string
    {
        $path = $this->attributes['video_path'] ?? null;

        return $path ? Storage::disk('public')->url($path) : null;
    }

    public function getHlsPathAttribute(): ?string
    {
        $path = $this->attributes['hls_path'] ?? null;

        return $path ? Storage::disk('public')->url($path) : null;
    }

    protected static function booted(): void
    {
        static::deleting(function (Video $video) {
            Storage::disk('public')->delete([
                $video->getRawOriginal('video_path'),
                $video->getRawOriginal('hls_path'),
            ]);
        });
    }
}
