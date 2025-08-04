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

        if ($cart->items()->where('id', $tier->id)->exists()) {
            $cart->items()->where('id', $tier->id)->update(['tier_cart_id' => null]);
        } else {
            $cart->items()->save($tier);
        }

    }
}
