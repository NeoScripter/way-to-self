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

    // Optional: Add helper method to get the HLS playlist URL
    public function getHlsPlaylistUrlAttribute()
    {
        if ($this->hls_path && $this->conversion_progress === 100) {
            return route('hls.playlist', ['model' => 'video', 'id' => $this->id]);
        }

        return null;
    }

    // Optional: Add helper method to get original video URL
    public function getVideoUrlAttribute()
    {
        return $this->video_path ? asset('storage/'.$this->video_path) : null;
    }
}
