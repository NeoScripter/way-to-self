<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminEditorController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort_by' => 'nullable|in:name,email,banned',
            'order' => 'nullable|in:asc,desc',
            'search' => 'nullable|string'
        ]);

        $sortBy = $validated['sort_by'] ?? 'name';
        $order = $validated['order'] ?? 'asc';
        $search = $validated['search'] ?? null;

        $options = [
            ['value' => 'name',  'label' => 'По имени'],
            ['value' => 'email', 'label' => 'По email'],
            ['value' => 'banned', 'label' => 'По статусу'],
        ];

        $editors = User::whereHas(
            'roles',
            fn($query) =>
            $query->where('roles.name', RoleEnum::EDITOR->value)
        )->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->whereRaw('users.name LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('surname LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('email LIKE ?', ["%{$search}%"]);
            });
        })->orderBy($sortBy, $order)->paginate(16)->withQueryString();


        return Inertia::render('admin/editors/index', [
            'editors' => fn() => $editors,
            'options' => fn() => $options,
        ]);
    }


    public function show(User $user)
    {
        $count = User::whereHas(
            'roles',
            fn($query) =>
            $query->where('roles.name', RoleEnum::EDITOR->value)
        )->count();

        return Inertia::render('admin/editors/show', [
            'user' => $user,
            'count' => $count
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/editors/create');
    }

    public function update(User $user, ProfileUpdateRequest $request): RedirectResponse
    {
        $user->fill($request->validated());

        $user->save();
        $user->touch();

        return redirect()->back();
    }
}
