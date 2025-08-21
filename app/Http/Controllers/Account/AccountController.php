<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $selectedTiers = $request->user()
            ->tiers()
            ->get(['tiers.id', 'tier_user.purchased_at'])
            ->map(function ($tier) {
                $expires = Carbon::parse($tier->pivot->purchased_at)->addYear();
                return [
                    'id' => $tier->id,
                    'expires' => $expires->format('d-m-Y'),
                    'expiring_soon' => now()->lt($expires) && now()->diffInDays($expires, false) < 14,
                ];
            })
            ->toArray();

        return Inertia::render('account/account', [
            'tiers' => fn() => Tier::select(['id', 'description', 'name', 'price'])->with(['image'])->latest()->get(),
            'purchased' => $selectedTiers,
        ]);
    }
}
