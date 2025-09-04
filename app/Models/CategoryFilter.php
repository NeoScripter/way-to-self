<?php

namespace App\Models;

use App\Enums\CategoryType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryFilter extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFilterFactory> */
    use HasFactory;

    public function recipes()
    {
        return $this->morphedByMany(Recipe::class, 'filterable');
    }

    public function exercises()
    {
        return $this->morphedByMany(Exercise::class, 'filterable');
    }

    public function articles()
    {
        return $this->morphedByMany(Article::class, 'filterable');
    }

    public function audios()
    {
        return $this->morphedByMany(Audio::class, 'filterable');
    }
    public function scopeForCategory(Builder $query, CategoryType $category): Builder
    {
        return $query->where('category', $category->value);
    }
}
