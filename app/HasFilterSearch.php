<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;

trait HasFilterSearch
{
    public function scopeWithFiltersAndSearch(Builder $query, ?array $types, ?string $search): Builder
    {
        return $query
            ->when($types, function ($query, $types) {
                $query->whereHas('filters', function ($q) use ($types) {
                    $q->whereIn('name', $types);
                });
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            });
    }
}
