<?php

namespace App\Support;

use Illuminate\Http\Request;

class SortAndSearchHelper
{
    public static function extract(Request $request): array
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:title,updated_at',
            'order' => 'nullable|in:asc,desc',
            'search' => 'nullable|string',
        ]);

        return [
            'sort_by' => $validated['sort_by'] ?? 'title',
            'order' => $validated['order'] ?? 'asc',
            'search' => $validated['search'] ?? null,
            'options' => [
                ['value' => 'title', 'label' => 'По названию'],
                ['value' => 'updated_at', 'label' => 'По дате изменения'],
            ],
        ];
    }
}
