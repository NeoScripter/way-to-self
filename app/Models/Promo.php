<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Promo extends Model
{
    protected function casts(): array
    {
        return [
            'expires_at' => 'date',
        ];
    }
    protected function expiresAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => \Carbon\Carbon::parse($value)->format('Y-m-d'),
        );
    }

    public function tierCarts(): HasMany
    {
        return $this->hasMany(TierCart::class);
    }
}
