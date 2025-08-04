<?php

namespace App\Http\Controllers\User;

use App\Actions\TierShop\AddTierToCart;
use App\Http\Controllers\Controller;
use App\Models\Tier;
use App\Models\TierCart;
use Inertia\Inertia;

class TierController extends Controller
{
    public function index()
    {
        $tiers = Tier::select(['id', 'description', 'name', 'price'])->with(['image'])->latest()->get();
        $selectedTiers = TierCart::getCart()->items()->pluck('id')->toArray();

        return Inertia::render('user/tiers', [
            'tiers' => $tiers,
            'added' => $selectedTiers
        ]);
    }

    public function addToCart(Tier $tier, AddTierToCart $cart)
    {
        $cart->add($tier);
    }
}
