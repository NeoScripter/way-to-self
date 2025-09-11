<?php

namespace App\Support;

use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class UserRoles
{
    /**
     * Return roles for the current user.
     * - first tries request attribute (intra-request),
     * - then session (cross-request cache),
     * - otherwise loads from DB and stores both session + request attribute.
     */
    public static function all(): array
    {
        $req = request();

        // 1) intra-request cache
        $fromRequest = $req->attributes->get('user_roles');
        if (is_array($fromRequest)) {
            return $fromRequest;
        }

        // 2) session cache
        if (Session::has('user_roles')) {
            $roles = Session::get('user_roles', []);
            $req->attributes->set('user_roles', $roles); // keep for remainder of request
            return $roles;
        }

        // 3) fallback to DB
        $user = Auth::user();
        $roles = $user ? $user->roles()->pluck('name')->toArray() : [];

        Session::put('user_roles', $roles);
        $req->attributes->set('user_roles', $roles);

        return $roles;
    }

    public static function has(string $role): bool
    {
        return in_array($role, self::all(), true);
    }

    public static function isAdmin(): bool
    {
        return self::has(RoleEnum::ADMIN->value);
    }

    public static function isEditor(): bool
    {
        return self::has(RoleEnum::EDITOR->value);
    }

    public static function isUser(): bool
    {
        return self::has(RoleEnum::USER->value);
    }

    /**
     * Force refresh roles from DB for a given user (or current user).
     * Use after you change a user's roles (admin action), after login, etc.
     */
    public static function refresh($user = null): array
    {
        $user = $user ?: Auth::user();
        $roles = $user ? $user->roles()->pluck('name')->toArray() : [];

        Session::put('user_roles', $roles);
        request()->attributes->set('user_roles', $roles);

        return $roles;
    }

    /** Remove roles from session + request (use on logout) */
    public static function forget(): void
    {
        Session::forget('user_roles');
        request()->attributes->remove('user_roles');
    }
}
