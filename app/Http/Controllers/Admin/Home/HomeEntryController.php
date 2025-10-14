<?php

namespace App\Http\Controllers\Admin\Home;

use App\Http\Controllers\Controller;
use App\Models\HomeEntry;
use App\Rules\AdminFieldRules;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HomeEntryController extends Controller
{
    public function update(HomeEntry $entry, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'description' => AdminFieldRules::description()
        ]);

        $entry->update($validated);

        return redirect()->back();
    }
}
