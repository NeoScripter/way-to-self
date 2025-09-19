<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Tier;
use App\Models\User;
use App\Support\UserRoles;

class TierPolicy
{
    /**
     * Create a new policy instance.
     */
    public function access(User $user, string $tierRoute): bool
    {
        $tier = $user->tiers()->where('route', $tierRoute)->first();

        return $tier && $tier->pivot->expires_at->isFuture();
    }
}
