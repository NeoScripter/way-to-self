<?php

namespace App\Models;

use App\Enums\CategoryType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    public function programs()
    {
        return $this->morphedByMany(Program::class, 'filterable');
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

    public static function menuItemsForCategory(CategoryType $category): array
    {
        $categories = static::where('category', $category->value)->whereNotNull('name')->get();

        return $categories
            ->groupBy('title')
            ->map(function ($items, $title) {
                return [
                    'id' => Str::uuid()->toString(),
                    'title' => $title,
                    'items' => $items->map(function ($category) {
                        return [
                            'id' => Str::uuid()->toString(),
                            'type' => $category->name,
                            'label' => $category->name,
                        ];
                    })->values()->all(),
                ];
            })
            ->values()
            ->all();
    }
}
