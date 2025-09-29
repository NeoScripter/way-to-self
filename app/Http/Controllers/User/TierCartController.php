<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use App\Models\Tier;
use App\Models\TierCart;
use Illuminate\Http\Request;

class TierCartController extends Controller
{
    public function update(Tier $tier)
    {
        $cart = TierCart::getCart();

        $cart->tiers()->toggle($tier->id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string',
        ]);

        $promo = Promo::where('name', $validated['code'])->first();

        if (! $promo) {
            return back()->withErrors(['code' => 'Промокод указан неверно']);
        }

        if (! $promo->expires_at->isFuture()) {
            return back()->withErrors(['code' => 'Срок действия данного промокода истек']);
        }

        $cart = TierCart::getCart();

        $cart->promo()->associate($promo);
        $cart->save();

        return back()->with('message', 'Промокод успешно активирован!');
    }
}
