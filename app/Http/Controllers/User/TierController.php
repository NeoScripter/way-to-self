<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use Inertia\Inertia;

class TierController extends Controller
{
    public function index()
    {
        $tiers = Tier::with(['image'])->latest()->get();

        return Inertia::render('user/tiers', [
            'tiers' => $tiers
        ]);
    }
}
