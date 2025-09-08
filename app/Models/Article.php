<?php

namespace App\Models;

use App\Enums\ArticleType;
use App\HasFilterSearch;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory, ConvertsMarkdownToHtml, HasFilterSearch;

    // protected $with = ['image', 'thumbnail'];

    public $casts = [
        'type' => ArticleType::class,
    ];

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

    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favorable', 'favorites');
    }

    public function isFree(): bool
    {
        return $this->type === ArticleType::NEWS;
    }

    #[Scope]
    protected function free(Builder $query): void
    {
        $query->where('type', ArticleType::NEWS);
    }
}
