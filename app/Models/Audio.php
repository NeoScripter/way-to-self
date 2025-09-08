<?php

namespace App\Models;

use App\Enums\ContentType;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use App\HasFilterSearch;

class Audio extends Model
{
    /** @use HasFactory<\Database\Factories\AudioFactory> */
    use HasFactory, HasFilterSearch, ConvertsMarkdownToHtml;

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function filters()
    {
        return $this->morphToMany(CategoryFilter::class, 'filterable');
    }

    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favorable', 'favorites');
    }

    #[Scope]
    public function free(Builder $query): void
    {
        $query->where('type', ContentType::FREE);
    }
}
