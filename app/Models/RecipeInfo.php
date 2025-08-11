<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class RecipeInfo extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeInfoFactory> */
    use HasFactory, ConvertsMarkdownToHtml;

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
