<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TierUser extends Model
{
    protected $table = 'tier_user';
    protected $guarded = [];

    /**
     * Scope to count unique user–tier combos
     * where the subscription has not expired.
     */
    public function scopeActiveUsersSince($query, int $days)
    {
        return $query->where('expires_at', '>', now()->subDays($days))
            ->distinct('user_id')
            ->count('user_id');
    }

    /**
     * Scope to count active subscriptions (user_id + tier_id).
     */
    public function scopeActiveSubscriptionsSince($query, int $days)
    {
        return $query->where('expires_at', '>', now()->subDays($days))
            ->count();
    }
}
