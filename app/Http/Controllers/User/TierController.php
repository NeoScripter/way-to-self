<?php

namespace App\Http\Controllers\User;

use App\Enums\DiscountType;
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
        $discount = $cart->promo;

        if ($discount) {
            if ($discount->discount_type === DiscountType::PERCENT->value) {
                $percent = $discount->discount;
                $original = $total * 100 / (100 - $percent);
                $amount = $original - $total;
                $percent .= '%';
            } else {
                $percent = $discount->discount . ' руб.';
                $amount = $discount->discount;
            }

            $discount = [
                'amount' => $amount,
                'percent' => $percent,
            ];
        }

        return Inertia::render('user/tiers', [
            'tiers' => fn() => Tier::select(['id', 'description', 'name', 'price'])->with(['image'])->latest()->get(),
            'added' => fn() => $selectedTiers,
            'total' => fn() => $total,
            'discount' => fn() => $discount,
        ]);
    }
}
