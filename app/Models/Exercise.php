<?php

namespace App\Models;

use App\Enums\ContentType;
use App\HasFilterSearch;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Exercise extends Model
{
    /** @use HasFactory<\Database\Factories\ExerciseFactory> */
    use HasFactory, ConvertsMarkdownToHtml, HasFilterSearch;

    protected $with = ['category'];

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function video(): MorphOne
    {
        return $this->morphOne(Video::class, 'videoable');
    }

    public function category(): HasOne
    {
        return $this->hasOne(ExerciseCategory::class);
    }

    public function favoritedBy()
    {
        return $this->morphToMany(User::class, 'favorable', 'favorites');
    }

    public function isFree(): bool
    {
        return $this->type === ContentType::FREE->value;
    }

    public function programBlocks(): BelongsToMany
    {
        return $this->belongsToMany(ProgramBlock::class, 'program_block_exercise');
    }

    public function filters()
    {
        return $this->morphToMany(CategoryFilter::class, 'filterable');
    }

    #[Scope]
    public function free(Builder $query): void
    {
        $query->where('type', ContentType::FREE);
    }
}
