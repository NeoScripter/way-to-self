<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory;

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function video(): MorphOne
    {
        return $this->morphOne(Image::class, 'videoable');
    }

    public function infos(): HasMany
    {
        return $this->hasMany(RecipeInfo::class);
    }

    public function steps(): HasMany
    {
        return $this->hasMany(RecipeStep::class);
    }

    public function category(): HasOne
    {
        return $this->hasOne(RecipeCategory::class);
    }
}
