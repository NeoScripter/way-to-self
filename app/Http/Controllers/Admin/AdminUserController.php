<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\TierUser;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:name,email,banned,telegram',
            'order' => 'nullable|in:asc,desc',
            'search' => 'nullable|string'
        ]);

        $sortBy = $validated['sort_by'] ?? 'name';
        $order = $validated['order'] ?? 'asc';
        $search = $validated['search'] ?? null;

        $options = [
            ['value' => 'name',  'label' => 'По имени'],
            ['value' => 'email', 'label' => 'По email'],
            ['value' => 'telegram', 'label' => 'По телеграму'],
            ['value' => 'banned', 'label' => 'По статусу'],
        ];

        $count = User::whereHas(
            'roles',
            fn($query) =>
            $query->where('roles.name', RoleEnum::USER->value)
        )->count();

        $users = User::withTrashed()->whereHas(
            'roles',
            fn($query) =>
            $query->where('roles.name', RoleEnum::USER->value)
        )->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->whereRaw('users.name LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('surname LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('telegram LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('email LIKE ?', ["%{$search}%"]);
            });
        })->orderBy($sortBy, $order)
            ->paginate(16)
            ->withQueryString();


        return Inertia::render('admin/users/index', [
            'users' => fn() => $users,
            'options' => fn() => $options,
            'count' => fn() => $count,
        ]);
    }


    public function show(User $user)
    {
        $count = User::whereHas(
            'roles',
            fn($query) =>
            $query->where('roles.name', RoleEnum::USER->value)
        )->count();

        $columns = $user->tiers()
            ->select('tiers.name', 'tier_user.created_at', 'tier_user.expires_at')
            ->orderBy('tiers.name')
            ->get()
            ->map(function ($tier) {
                return [
                    'title' => $tier->name,
                    'start' => \Carbon\Carbon::parse($tier->pivot->created_at)->format('d-m-Y'),
                    'end'   => \Carbon\Carbon::parse($tier->pivot->expires_at)->format('d-m-Y'),
                ];
            });

        if ($columns->count() > 0) {
            $columns->prepend([
                'title' => 'Раздел',
                'start' => 'Начало подписки',
                'end'   => 'Окончание подписки',
            ]);
        }

        return Inertia::render('admin/users/show', [
            'user' => fn() => $user,
            'count' => fn() => $count,
            'columns' => fn() => $columns
        ]);
    }

    public function update(User $user, ProfileUpdateRequest $request): RedirectResponse
    {
        $user->fill($request->validated());

        $user->save();
        $user->touch();

        return redirect()->back();
    }
}
