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
        $tiers = Tier::select(['id', 'description', 'name', 'price'])->with(['image'])->latest()->get();
        $cart = TierCart::getCart();
        $selectedTiers = $cart->tiers()->pluck('id')->toArray();
        $total = $cart->total();

        return Inertia::render('user/tiers', [
            'tiers' => $tiers,
            'added' => $selectedTiers,
            'total' => $total,
        ]);
    }
}
