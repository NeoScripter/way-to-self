<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
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
        $outputDir = storage_path('app/private/videos');
        $outputPath = "{$outputDir}/{$filename}.webm";

        if (! is_dir($outputDir)) {
            mkdir($outputDir, 0775, true);
        }

        $command = [
            'ffmpeg',
            '-y', // overwrite output
            '-i',
            $tempPath,
            '-c:v',
            'libvpx-vp9',
            '-b:v',
            '0',
            '-crf',
            '30',
            '-vf',
            "scale={$width}:-1",
            '-c:a',
            'libopus',
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
