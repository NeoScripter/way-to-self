<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;
    use ConvertsMarkdownToHtml;

    public function images(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function image(): MorphOne
    {
        return $this->images()->where('type', 'image');
    }

    public function thumbnail(): MorphOne
    {
        return $this->images()->where('type', 'thumbnail');
    }
}
