<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Collection;

class ItemMapper
{
    public static function from(Collection $collection): array
    {
        return $collection->map(fn($model) => [
            'id' => $model->id,
            'image' => $model->image?->path,
            'title' => $model->title,
            'description' => $model->description,
        ])->toArray();
    }
}
