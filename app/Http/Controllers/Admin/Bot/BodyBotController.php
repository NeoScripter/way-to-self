<?php

namespace App\Http\Controllers\Admin\Bot;

use App\Http\Controllers\Controller;
use App\Models\Tier;
use App\Rules\AdminFieldRules;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BodyBotController extends Controller
{
    public function index()
    {
        $tg_greet = Tier::select('tg_greet')->where('route', 'body')->first();

        return Inertia::render('admin/bot/bot', [
            'namespace' => fn() => 'body',
            'tg_greet' => fn() => $tg_greet['tg_greet']
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'tg_greet' => AdminFieldRules::body(),
        ]);

        $tier = Tier::where('route', 'body')->first();

        $tier->update($validated);

        return redirect()->back();
    }
}
