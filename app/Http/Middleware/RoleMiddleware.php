<?php

namespace App\Http\Middleware;

use App\Support\UserRoles;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = Auth::user();

        if (! $user) {
            abort(403, 'У вас нет доступа к данному разделу');
        }

        $userRoles = UserRoles::all();

        if (!array_intersect($roles, $userRoles)) {
            abort(403, 'У вас нет доступа к данному разделу');
        }

        return $next($request);
    }
}
