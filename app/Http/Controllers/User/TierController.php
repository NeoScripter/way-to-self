<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use App\Models\TierCart;
use Inertia\Inertia;

class TierController extends Controller
{
    public function index()
    {
        $cart = TierCart::getCart();
        $selectedTiers = $cart->tiers()->pluck('id')->toArray();
        $total = $cart->total();

        return Inertia::render('user/tiers', [
            'tiers' => fn () => Tier::select(['id', 'description', 'name', 'price'])->with(['image'])->latest()->get(),
            'added' => $selectedTiers,
            'total' => $total,
        ]);
    }
}
