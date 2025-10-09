<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ContentCategory extends Model
{
    /** @use HasFactory<\Database\Factories\ContentCategoryFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function categorizable(): MorphTo
    {
        return $this->morphTo();
    }
}
