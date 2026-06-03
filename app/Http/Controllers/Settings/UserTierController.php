<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserTierController extends Controller
{
    public function store(User $user, int $tierId)
    {
        if ($user->isAdmin()) {
            abort(403, "Администратор сайта не может быть заблокирован");
        }

        $user->extendTier($tierId);

        return redirect()
            ->back()
            ->with('message', 'Подписка успешно продлена');
    }

    public function destroy(User $user, int $tierId)
    {
        $user->reduceTier($tierId);

        return redirect()
            ->back()
            ->with('message', 'Подписка успешно сокращена');
    }
}
