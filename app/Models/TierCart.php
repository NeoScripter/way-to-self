<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class TierCart extends Model
{
    /** @use HasFactory<\Database\Factories\TierCartFactory> */
    use HasFactory;

    public function items(): HasMany
    {
        return $this->hasMany(Tier::class);
    }

    public static function getCart(): TierCart
    {
        if (Auth::check()) {
            return Auth::user()
                ->cart()
                ->with('items')
                ->firstOrCreate();
        }

        return static::with('items')->firstOrCreate([
            'session_id' => session()->getId(),
        ]);
    }
}
