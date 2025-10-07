<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class VideoResizer
{
    /**
     * Handle and compress uploaded video using FFmpeg.
     *
     * @param  UploadedFile  $file
     * @param  int  $width  Target width in pixels (preserves aspect ratio)
     * @return array
     */
    public function handleVideo(UploadedFile $file, int $width = 1280): array
    {
        // Prepare filenames and paths
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $filename = Str::slug($originalName) . '-' . uniqid();
        $tempPath = $file->getRealPath();
        $outputDir = storage_path('app/public/videos');
        $outputPath = "{$outputDir}/{$filename}.webm";

        // Ensure directory exists
        Storage::disk('public')->makeDirectory('videos');

        // FFmpeg command
        // -c:v libvpx-vp9 : use VP9 codec (better compression for web)
        // -b:v 0 and -crf N : quality/size balance (lower CRF = higher quality)
        // -vf scale=WIDTH:-1 : resize keeping aspect ratio
        // -c:a libopus : modern audio codec for WebM
        $command = [
            'ffmpeg',
            '-y', // overwrite output
            '-i', $tempPath,
            '-c:v', 'libvpx-vp9',
            '-b:v', '0',
            '-crf', '30',
            '-vf', "scale={$width}:-1",
            '-c:a', 'libopus',
            $outputPath,
        ];

        $process = new Process($command);
        $process->setTimeout(null); // Allow long videos
        $process->run();

        if (! $process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return [
            'original' => "videos/{$filename}.webm",
        ];
    }
}
