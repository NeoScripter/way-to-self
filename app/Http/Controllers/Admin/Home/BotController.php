<?php

namespace App\Http\Controllers\Admin\Home;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use App\Rules\AdminFieldRules;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SoulBotController extends Controller
{
    public function index()
    {
        $tg_greet = Tier::select('tg_greet')->where('route', 'soul')->first();

        return Inertia::render('admin/home/bot', [
            'namespace' => fn() => 'soul',
            'tg_greet' => fn() => $tg_greet
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'tg_greet' => AdminFieldRules::body(),
        ]);

        $tier = Tier::where('route', 'soul')->first();

        $tier->update($validated);

        return redirect()->back();
    }
}
