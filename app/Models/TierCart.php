<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;

class TierCart extends Model
{
    /** @use HasFactory<\Database\Factories\TierCartFactory> */
    use HasFactory;

    public function tiers(): BelongsToMany
    {
        return $this->belongsToMany(Tier::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function getCart(): TierCart
    {
        if (Auth::check()) {
            return Auth::user()
                ->cart()
                ->with('tiers')
                ->firstOrCreate();
        }

        return static::with('tiers')->firstOrCreate([
            'session_id' => session()->getId(),
        ]);
    }

    public function total(): int
    {
        return $this->tiers()->sum('price');
    }

    public function clear()
    {
        $cart = $this::getCart();
        $cart->tiers()->detach();
    }

    public function isEmpty(): bool
    {
        return $this->total() === 0;
    }

    public function assignTiers(User $user): void
    {
        $this->tiers()->each(function ($tier) use ($user) {
            $existing = $user->tiers()->find($tier->id);

            $newExpires = $existing && $existing->pivot->expires_at->isFuture()
                ? $existing->pivot->expires_at->copy()->addYear()
                : now()->addYear();

            $user->tiers()->syncWithoutDetaching([
                $tier->id => ['expires_at' => $newExpires],
            ]);
        });
    }
}
