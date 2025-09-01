<?php

namespace App\Policies;

use App\Models\Tier;
use App\Models\User;

class TierPolicy
{
    /**
     * Create a new policy instance.
     */
    public function access(User $user, string $tierRoute): bool
    {
        return $user->hasTier($tierRoute);
    }
}
