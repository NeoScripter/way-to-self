<?php

use App\Models\Tier;
use App\Models\TierCart;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

it('creates a cart when the user add an item', function () {
    $user = User::factory()->create();
    $tier = Tier::factory()->create();

    actingAs($user)
        ->post(route('cart.tiers.update', $tier->id));

    expect(TierCart::count())->toBe(1);
    expect($user->fresh()->cart)->not()->toBeNull();
    expect($user->cart->tiers->pluck('id'))->toContain($tier->id);
});

it('empties the cart when order is created', function () {
    $tier = Tier::factory()->create();

    post(route('cart.tiers.update', $tier->id));
    post(route('cart.tiers.empty'));

    expect(TierCart::getCart()->fresh()->tiers()->count())->toBe(0);
});

it('outputs the correct sum of the products in the cart', function () {
    $tierPrice = 3000;
    $tierCount = 3;
    $expectedTotal = $tierPrice * $tierCount;

    $cart = TierCart::create(['session_id' => session()->getId()]);
    $tiers = Tier::factory(['price' => $tierPrice])
        ->count($tierCount)
        ->create();

    $tiers->each(function ($tier) use ($cart) {
        $cart->tiers()->attach($tier->id);
    });

    $cart = TierCart::getCart();
    $actualTotal = $cart->total();

    expect($actualTotal)->toBe($expectedTotal);
    expect($cart->tiers()->count())->toBe($tierCount);
});

it('handles empty cart total calculation', function () {
    $cart = TierCart::getCart();

    expect($cart->total())->toBe(0);
    expect($cart->tiers()->count())->toBe(0);
});
