<?php

namespace App\Http\Controllers\Admin\Bot;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use App\Rules\AdminFieldRules;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionBotController extends Controller
{
    public function index()
    {
        $tg_greet = Tier::select('tg_greet')->where('route', 'nutrition')->first();

        return Inertia::render('admin/bot/bot', [
            'namespace' => fn() => 'nutrition',
            'tg_greet' => fn() => $tg_greet['tg_greet']
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'tg_greet' => AdminFieldRules::body(),
        ]);

        $tier = Tier::where('route', 'nutrition')->first();

        $tier->update($validated);

        return redirect()->back();
    }
}
