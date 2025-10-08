<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Video;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessAndAttachVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /** @var class-string<Model> */
    protected string $modelClass;
    protected int $modelId;
    protected string $tempPath;
    protected int $width;
    public $timeout = 0;

    public function __construct(
        public Model $model,
        public string $path,
    ) {}

    public function handle(): void
    {
        if (!Storage::exists($this->path)) {
            Log::error("Video file missing at {$this->path}");
            return;
        }

        $absolute = Storage::path($this->path);

        $uploadedFile = new UploadedFile(
            $absolute,
            basename($absolute),
            mime_content_type($absolute),
            null,
            true
        );

        Video::attachTo($this->model, $uploadedFile);

        Storage::delete($this->path);
    }
}
