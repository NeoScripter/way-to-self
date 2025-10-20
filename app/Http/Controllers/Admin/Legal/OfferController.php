<?php

namespace App\Http\Controllers\Admin\Legal;

use App\Enums\LegalInfoKeys;
use App\Http\Controllers\Controller;
use App\Models\LegalInfo;
use App\Rules\AdminFieldRules;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index()
    {
        $info = LegalInfo::where('key', LegalInfoKeys::OFFER)->first();

        return Inertia::render('admin/legal/legal', [
            'namespace' => fn() => LegalInfoKeys::OFFER,
            'info' => fn() => $info
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => AdminFieldRules::title(),
            'body' => AdminFieldRules::body(),
        ]);

        $info = LegalInfo::where('key', LegalInfoKeys::OFFER)->first();

        $info->update($validated);

        return redirect()->back();
    }
}
