<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminEditorController extends Controller
{
    public function index()
    {
        $editors = User::whereHas('roles', fn($query) =>
            $query->where('name', RoleEnum::EDITOR->value)
        )->get();

        return Inertia::render('admin/editors/index', [
            'editors' => $editors
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('admin/editors/show', [
            'user' => $user
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/editors/create');
    }
}
