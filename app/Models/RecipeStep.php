<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class RecipeStep extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeStepFactory> */
    use ConvertsMarkdownToHtml, HasFactory;

    protected $with = ['image'];

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
