<?php

namespace App\Http\Middleware;

use App\Enums\RoleEnum;
use App\Support\UserRoles;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TierAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $tierRoute): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }
        if (UserRoles::isAdmin() || UserRoles::isEditor()) {
            return $next($request);
        }

        if (!$user->hasTier($tierRoute)) {
            return redirect()->route('account')
                ->with('message', 'У вас нет доступа к данному разделу');
        }
        return $next($request);
    }
}
