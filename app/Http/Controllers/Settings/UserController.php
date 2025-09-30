<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(User $user)
    {
        if ($user->isAdmin()) {
            abort(403, "Администратор сайта не может быть заблокирован");
        }

        if ($user->trashed()) {
            $user->restore();
            return redirect()
                ->back()
                ->with('message', "Пользователь успешно восстановлен");
        }

        $user->update(['banned' => !$user->banned]);

        $message = $user->banned
            ? "Пользователь успешно заблокирован"
            : "Пользователь успешно разблокирован";

        return redirect()
            ->back()
            ->with('message', $message);
    }

    public function restore(User $user)
    {
        if (! $user->trashed()) {
            abort(404, "Пользователь уже восстановлен");
        }

        $user->restore();

        return redirect()
            ->back()
            ->with('message', "Пользователь успешно восстановлен");
    }

    public function destroy(User $user)
    {
        $route = $user->isEditor()
            ? 'admin.editors.index'
            : 'admin.users.index';

        $user->forceDelete();

        return redirect()
            ->route($route)
            ->with('message', 'Пользователь успешно удален');
    }
}
