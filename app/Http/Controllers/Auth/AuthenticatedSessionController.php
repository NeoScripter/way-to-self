<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        UserRoles::refresh($request->user);

        $route = 'account';
        if (UserRoles::isAdmin() || UserRoles::isEditor()) {
            $route = 'admin.dashboard';
        }

        return redirect()
            ->route($route)
            ->with('message', 'Добро пожаловать!');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        UserRoles::forget();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()
            ->intended(route('home'))
            ->with('message', 'Удачного вам дня!');
    }

    public function dev(Request $request): RedirectResponse
    {
        $user = User::where('email', 'admin@gmail.com')->first();

        if (! $user) {
            abort(404, 'Dev user not found');
        }

        Auth::login($user);
        $request->session()->regenerate();
        UserRoles::refresh($user);

        $route = 'account';
        if (UserRoles::isAdmin() || UserRoles::isEditor()) {
            $route = 'admin.dashboard';
        }

        return redirect()
            ->route($route)
            ->with('message', 'Добро пожаловать!');
    }
}
