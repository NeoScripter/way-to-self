<?php

namespace App\Models;

use App\Enums\ContentType;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Exercise extends Model
{
    use ConvertsMarkdownToHtml;
    /** @use HasFactory<\Database\Factories\ExerciseFactory> */
    use HasFactory;

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
