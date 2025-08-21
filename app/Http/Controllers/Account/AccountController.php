<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $selectedTiers = $request->user()->tiers()->pluck('tiers.id')->toArray();

        return Inertia::render('account/account', [
            'tiers' => fn () => Tier::select(['id', 'description', 'name', 'price'])->with(['image'])->latest()->get(),
            'purchased' => $selectedTiers,
        ]);
    }
}
