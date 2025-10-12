<?php

namespace App\Models;

use App\Enums\ContentType;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use App\HasFilterSearch;
use Illuminate\Support\Facades\Storage;

class Audio extends Model
{
    /** @use HasFactory<\Database\Factories\AudioFactory> */
    use HasFactory, HasFilterSearch, ConvertsMarkdownToHtml;

    protected $appends = ['stream_path'];

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function filters()
    {
        return $this->morphToMany(CategoryFilter::class, 'filterable');
    }

    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favorable', 'favorites');
    }

    #[Scope]
    public function free(Builder $query): void
    {
        $query->where('type', ContentType::FREE);
    }

    public function getAudioUrlAttribute(): string
    {
        return asset(str_replace('private/', 'storage/', $this->audio_path));
    }

    public function getHlsUrlAttribute(): ?string
    {
        return $this->hls_path ?: null;
    }

    public function streamHls(string $file = 'index.m3u8')
    {
        $path = "private/audios/{$this->id}/{$file}";

        if (!Storage::disk('local')->exists($path)) {
            abort(404);
        }

        $mime = str_ends_with($file, '.m3u8')
            ? 'application/vnd.apple.mpegurl'
            : 'video/mp2t';

        return response()->file(storage_path("app/{$path}"), [
            'Content-Type' => $mime,
        ]);
    }

    public function getStreamPathAttribute(): ?string
    {
        if ($this->hls_path) {
            return $this->hls_path;
        }

        return null;
    }

    protected static function booted(): void
    {
        static::deleting(function (Audio $audio) {
            if ($audio->getRawOriginal('audio_path')) {
                Storage::disk('local')->delete($audio->getRawOriginal('audio_path'));
            }

            $hlsDir = "private/audios/{$audio->id}";
            if (Storage::disk('local')->exists($hlsDir)) {
                Storage::disk('local')->deleteDirectory($hlsDir);
            }
        });
    }
}
