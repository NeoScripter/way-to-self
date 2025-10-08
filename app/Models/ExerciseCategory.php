<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExerciseCategory extends Model
{
    /** @use HasFactory<\Database\Factories\ExerciseCategoryFactory> */
    use HasFactory;

    public function exercise(): BelongsTo
    {
        return $this->belongsTo(Exercise::class);
    }
}
