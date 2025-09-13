<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Tier extends Model
{
    /** @use HasFactory<\Database\Factories\TierFactory> */
    use HasFactory;

    public function images(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function image(): MorphOne
    {
        return $this->images()->where('type', 'image');
    }

    public function cart(): BelongsToMany
    {
        return $this->belongsToMany(TierCart::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('expires_at');
    }
}
