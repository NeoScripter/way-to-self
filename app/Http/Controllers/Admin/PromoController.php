<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Promo;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;


class PromoController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:name,email',
            'order' => 'nullable|in:asc,desc',
            'search' => 'nullable|string'
        ]);

        $sortBy = $validated['sort_by'] ?? 'name';
        $order = $validated['order'] ?? 'asc';
        $search = $validated['search'] ?? null;

        $options = [
            ['value' => 'name',  'label' => 'По названию'],
            ['value' => 'discount', 'label' => 'По скидке'],
            ['value' => 'expires_at', 'label' => 'По сроку действия'],
        ];

        $count = Promo::all()->count();

        $promos = Promo::when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->whereRaw('name LIKE ?', ["%{$search}%"]);
            });
        })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();


        return Inertia::render('admin/promos/index', [
            'promos' => fn() => $promos,
            'options' => fn() => $options,
            'count' => fn() => $count
        ]);
    }


    public function show(Promo $promo)
    {
        $count = Promo::all()->count();
        $options = [
            ['value' => 'percent',  'label' => 'Процент'],
            ['value' => 'currency', 'label' => 'Рубли'],
        ];

        return Inertia::render('admin/promos/show', [
            'promo' => fn() => $promo,
            'count' => fn() => $count,
            'options' => fn() => $options,
        ]);
    }

    public function create()
    {
        $count = Promo::all()->count();

        $options = [
            ['value' => 'percent',  'label' => 'Процент'],
            ['value' => 'currency', 'label' => 'Рубли'],
        ];

        return Inertia::render('admin/promos/create', [
            'count' => $count,
            'options' => $options,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|min:1|max:100',
            'expires_at'    => 'required|date',
            'discount'      => 'required|numeric|min:0',
            'discount_type' => 'required|string|in:currency,percent',
        ]);

        Promo::create($validated);

        return redirect()->route('admin.promos.index')->with('message', 'Промокод успешно создан');
    }

    public function toggle(Promo $promo)
    {
        $promo->update(['enabled' => !$promo->enabled]);

        $message = $promo->enabled
            ? "промокод успешно активирован"
            : "Промокод успешно деактивирован";

        return redirect()
            ->back()
            ->with('message', $message);
    }

    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'ids'   => ['required', 'array'],
            'ids.*' => ['integer', 'exists:promos,id'],
        ]);

        $promos = Promo::whereIn('id', $validated['ids'])->get();

        $message = $promos->count() > 1
            ? "Промокоды успешно удалены"
            : "Промокод успешно удален";

        $promos->each(fn($promo) => $promo->delete());

        return redirect()->route('admin.promos.index')->with('message', $message);
    }

    public function update(Promo $promo, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'          => 'required|string|min:1|max:100',
            'expires_at'    => 'required|date',
            'discount'      => 'required|numeric|min:0',
            'discount_type' => 'required|string|in:currency,percent',
        ]);

        $promo->update($validated);

        return redirect()->back();
    }
}
