<?php

namespace App\Models;

use App\Enums\DiscountType;
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

    public function promo(): BelongsTo
    {
        return $this->belongsTo(Promo::class);
    }

    public static function getCart(): TierCart
    {
        if (Auth::check()) {
            return Auth::user()->cart()->with('tiers')->firstOrCreate([
                'user_id' => Auth::id(),
            ]);
        }

        return static::with('tiers')->firstOrCreate([
            'session_id' => session()->getId(),
        ]);
    }

    public function total(): int
    {
        $sum = $this->tiers()->sum('price');

        $promo = $this->promo;
        if ($promo && Carbon::parse($promo->expires_at)->isFuture()) {
            if ($promo->discount_type === DiscountType::PERCENT->value) {
                $sum = intdiv($sum * (100 - $promo->discount), 100);
            } else {
                $sum -= $promo->discount;
            }
        }

        return max($sum, 0);
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
            $current = $user->tiers()->find($tier->id);

            if (! $current) {
                $expires = now()->addYear();
            } else {
                $end = Carbon::parse($current->pivot->expires_at);
                $expires = $end->isFuture()
                    ? $end->addYear()
                    : now()->addYear();
            }

            $user->tiers()->syncWithoutDetaching([
                $tier->id => ['expires_at' => $expires],
            ]);
        });
    }
}
