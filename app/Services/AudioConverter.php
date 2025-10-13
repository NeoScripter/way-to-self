<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class AudioConverter
{
    /**
     * Convert uploaded audio file into MP3 and HLS format for streaming.
     *
     * @param  UploadedFile  $file
     * @param  int  $audioId
     * @return array{original: string, hls: string}
     */
    public function handleAudio(UploadedFile $file, int $audioId): array
    {
        // Prepare filenames and paths
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $filename = Str::slug($originalName) . '-' . uniqid();
        $tempPath = $file->getRealPath();

        $originalDir = storage_path('app/private/original_audios');
        $hlsDir = storage_path("app/private/audios/{$audioId}");

        File::ensureDirectoryExists($originalDir, 0775, true);
        File::ensureDirectoryExists($hlsDir, 0775, true);

        $originalPath = "{$originalDir}/{$filename}.mp3";
        $hlsIndexPath = "{$hlsDir}/index.m3u8";

        /**
         * Step 1: Convert original to MP3 for archival consistency
         */
        $convertOriginal = [
            'ffmpeg',
            '-y',
            '-i', $tempPath,
            '-codec:a', 'libmp3lame',
            '-b:a', '192k',
            $originalPath,
        ];

        $process = new Process($convertOriginal);
        $process->setTimeout(null);
        $process->run();

        if (! $process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        /**
         * Step 2: Convert to HLS for streaming
         */
        $convertHls = [
            'ffmpeg',
            '-y',
            '-i', $originalPath,
            '-codec:a', 'aac',
            '-b:a', '128k',
            '-hls_time', '6',
            '-hls_playlist_type', 'vod',
            '-hls_segment_filename', "{$hlsDir}/segment_%03d.ts",
            '-f', 'hls',
            $hlsIndexPath,
        ];

        $process = new Process($convertHls);
        $process->setTimeout(null);
        $process->run();

        if (! $process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        /**
         * Step 3: Return relative storage paths for database usage
         */
        return [
            'original' => "private/original_audios/{$filename}.mp3",
            'hls'      => "private/audios/{$audioId}/index.m3u8",
        ];
    }
}
