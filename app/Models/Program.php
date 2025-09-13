<?php

namespace App\Models;

use App\HasFilterSearch;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Program extends Model
{
    /** @use HasFactory<\Database\Factories\ProgramFactory> */
    use HasFactory, HasFilterSearch, ConvertsMarkdownToHtml;

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function video(): MorphOne
    {
        return $this->morphOne(Video::class, 'videoable');
    }

    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favorable', 'favorites');
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(ProgramBlock::class);
    }
}
