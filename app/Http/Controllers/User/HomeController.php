<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\FaqItem;
use App\Models\Review;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $faqs = FaqItem::latest()->get();
        $reviews = Review::with(['image'])->latest()->get();

        return Inertia::render('user/home', [
            'faqs' => $faqs,
            'reviews' => $reviews,
        ]);
    }
}
