<?php

namespace App\Http\Controllers\Account;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\FaqItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SoulController extends Controller
{
    public function index(Request $request)
    {
        $faqs = FaqItem::latest()
            ->where('type', ArticleType::SOUL)
            ->get();

        return Inertia::render('account/soul', [
            'faqs' => $faqs
        ]);
    }
}
