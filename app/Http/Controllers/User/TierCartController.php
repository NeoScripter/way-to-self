<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use App\Models\TierCart;

class TierCartController extends Controller
{
    public function update(Tier $tier)
    {
        $cart = TierCart::getCart();

        $cart->tiers()->toggle($tier->id);

    }

    public function empty()
    {
        $cart = TierCart::getCart();
        $cart->tiers()->detach();
    }
}
