<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Support\UserRoles;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $admin = User::select(['name', 'surname', 'email'])->admin()->first();

        return [
            ...parent::share($request),
            'flash' => [
                'message' => fn() => $request->session()->pull('message')
            ],
            'name' => config('app.name'),
            'admin' => [
                'name' => $admin['name'],
                'surname' =>$admin['surname'],
                'email' => $admin['email'],
            ],
            'auth' => [
                'user' => $request->user(),
                'roles' => UserRoles::all(),
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
