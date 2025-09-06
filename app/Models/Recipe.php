<?php

namespace App\Models;

use App\Enums\ContentType;
use App\HasFilterSearch;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory, HasFilterSearch;

    protected $with = ['category'];

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function video(): MorphOne
    {
        return $this->morphOne(Video::class, 'videoable');
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
    public function filters()
    {
        return $this->morphToMany(CategoryFilter::class, 'filterable');
    }

    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favorable', 'favorites');
    }

    public function isFree(): bool
    {
        return $this->type === ContentType::FREE->value;
    }

    #[Scope]
    public function free(Builder $query): void
    {
        $query->where('type', ContentType::FREE);
    }
}
