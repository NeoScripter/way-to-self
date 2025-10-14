<?php

namespace App\Models;

use App\HasVideos;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Overview extends Model
{
    use HasVideos;

    protected $with = ['video'];

    public function video(): MorphOne
    {
        return $this->morphOne(Video::class, 'videoable');
    }
}
