<?php

namespace App\Jobs;

use App\Services\AudioConverter;
use App\Models\Audio;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessAndAttachAudio implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 0;

    public function __construct(
        public Audio $audio,
        public string $path,
    ) {}

    public function handle(): void
    {
        if (!Storage::exists($this->path)) {
            Log::error("Audio file missing at {$this->path}");
            return;
        }

        $absolute = Storage::path($this->path);

        $uploadedFile = new UploadedFile(
            $absolute,
            basename($absolute),
            mime_content_type($absolute),
            null,
            true // test mode (bypass file upload validation)
        );

        $converter = new AudioConverter();
        $paths = $converter->handleAudio($uploadedFile, $this->audio->id);

        $this->audio->update([
            'audio_path' => $paths['original'],
            'hls_path'   => $paths['hls'],
        ]);

        Storage::delete($this->path);
    }
}
