<?php

namespace App\Models;

use AchyutN\LaravelHLS\Traits\ConvertsToHLS;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory, ConvertsToHls;

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

    public function srcVideo()
    {
        return $this->video_path ? asset('storage/'.$this->video_path) : null;
    }
}
