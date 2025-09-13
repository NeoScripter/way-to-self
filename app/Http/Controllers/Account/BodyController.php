<?php

namespace App\Http\Controllers\Account;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\FaqItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BodyController extends Controller
{
    public function index(Request $request)
    {
        $faqs = FaqItem::latest()
            ->where('type', ArticleType::EXERCISE)
            ->get();

        return Inertia::render('account/body', [
            'faqs' => $faqs
        ]);
    }
}
