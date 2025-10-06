<?php

namespace App\Http\Controllers\Admin\Nutrition;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\FaqItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FAQController extends Controller
{
    public function index()
    {
        $faqs = FaqItem::where('type', '=', ArticleType::NUTRITION)->latest()->get();

        return Inertia::render('admin/nutrition/faqs', [
            'faqs' => fn() => $faqs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:120',
            'body' => 'required|string|max:64000',
        ]);

        $validated['type'] = ArticleType::NUTRITION;

        FaqItem::create($validated);

        return redirect()->back();
    }

    public function destroy(FaqItem $faq)
    {
        $faq->delete();

        return redirect()->back()->with('message', 'Вопрос успешно удален!');
    }

    public function update(FaqItem $faq, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'nullable|string|max:120',
            'body' => 'nullable|string|max:64000',
        ]);

        $validated['type'] = ArticleType::NUTRITION;

        $faq->update($validated);

        return redirect()->back();
    }
}
