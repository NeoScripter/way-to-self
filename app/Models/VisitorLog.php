<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class VisitorLog extends Model
{
    public function scopeVisitorsSince($query, int $days)
    {
        return $query
            ->where('visited_date', '>=', now()->subDays($days)->toDateString())
            ->count();
    }
}
