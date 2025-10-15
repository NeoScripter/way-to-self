<?php

namespace App\Jobs;

use App\Models\Audio;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
class ConvertAudioToHls implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Audio $audio,
        public UploadedFile $file
    ) {}

    public function handle(): void
    {
        $audio = $this->audio;
        $file = $this->file;

        // Prepare directories and filenames
        // $filename = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '-' . uniqid();
        $hlsDir = storage_path("app/private/audios/{$audio->id}");
        File::ensureDirectoryExists($hlsDir, 0755, true);

        $tempPath = $file->getRealPath();
        $outputPath = "{$hlsDir}/index.m3u8";

        // Convert to HLS (AAC audio)
        $command = [
            'ffmpeg',
            '-y',
            '-i', $tempPath,
            '-c:a', 'aac',
            '-b:a', '128k',
            '-hls_time', '10',
            '-hls_list_size', '0',
            '-f', 'hls',
            $outputPath,
        ];

        $process = new Process($command);
        $process->setTimeout(null);
        $process->run();

        if (! $process->isSuccessful()) {
            Log::error('FFmpeg failed for audio ID ' . $audio->id . ': ' . $process->getErrorOutput());
            throw new ProcessFailedException($process);
        }

        // Update DB with stream route
        $audio->update([
            'hls_path' => route('audio.stream', ['audio' => $audio->id]),
        ]);
    }
}
