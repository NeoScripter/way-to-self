<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Enums\RoleEnum;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\Promo;
use App\Models\Role;
use App\Models\User;
use App\Notifications\SendEditorPasswordNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
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
        // TODO
        return redirect()->back()->with('message', 'Промокод успешно активирован');
    }

    public function destroy(Promo $promo)
    {
        $promo->delete();

        return redirect()->route('admin.promos.index')->with('message', 'Промокод успешно удален');
    }

    public function update(Promo $promo, Request $request): RedirectResponse
    {
        $promo->fill($request->validated());

        $promo->save();
        $promo->touch();

        return redirect()->back();
    }
}
