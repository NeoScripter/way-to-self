<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\FaqItem;
use App\Models\Tier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionController extends Controller
{
    public function index(Request $request)
    {
        $faqs = FaqItem::latest()
            ->get();

        return Inertia::render('account/nutrition', [
            'faqs' => $faqs
        ]);
    }
}
