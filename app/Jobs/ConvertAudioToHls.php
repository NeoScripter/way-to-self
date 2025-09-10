<?php

namespace App\Jobs;

use App\Models\Audio;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\File;

class ConvertAudioToHls implements ShouldQueue
{
    use Queueable;

    public function __construct(public Audio $audio) {}

    public function handle(): void
    {
        $audio = $this->audio;

        $hlsDir = storage_path("app/private/audios/{$audio->id}");
        File::ensureDirectoryExists($hlsDir, 0755, true);

        $inputPath  = storage_path('app/' . ltrim($audio->getRawOriginal('original_path'), '/'));
        $outputPath = $hlsDir . '/index.m3u8';

        $cmd = sprintf(
            'ffmpeg -i %s -codec copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls %s',
            escapeshellarg($inputPath),
            escapeshellarg($outputPath)
        );

        exec($cmd);

        $audio->update([
            'hls_path' => route('audio.stream', ['audio' => $audio->id]),
        ]);
    }
}
