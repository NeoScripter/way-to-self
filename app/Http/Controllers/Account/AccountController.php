<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Recipe;
use App\Models\User;
use App\Models\Tier;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $selectedTiers = $request->user()
            ->tiers()
            ->get(['tiers.id', 'tier_user.purchased_at'])
            ->map(function ($tier) {
                $expires = Carbon::parse($tier->pivot->purchased_at)->addYear();
                return [
                    'id' => $tier->id,
                    'expires' => $expires->format('d-m-Y'),
                    'expiring_soon' => now()->lt($expires) && now()->diffInDays($expires, false) < 14,
                ];
            })
            ->toArray();

        $articles = Article::select(['id', 'description', 'title'])
            ->free()
            ->with(['thumbnail'])
            ->latest()
            ->limit(4)
            ->get();

        return Inertia::render('account/account', [
            'tiers' => fn() => Tier::select(['id', 'route', 'description', 'name', 'price'])->with(['image'])->latest()->get(),
            'purchased' => fn() => $selectedTiers,
            'articles' => fn() => $articles,
            'favorites' => fn() => $this->favorites($request),
            'prefix' => fn() => 'user.articles.show'
        ]);
    }

    public function favorites(Request $request)
    {
        $user = Auth::user();

        $types = $request->validate([
            'types'   => 'nullable|array',
            'types.*' => 'in:articles,exercises,audio,recipes',
        ])['types'] ?? null;

        $map = [
            'articles'  => [Article::class,  ['articles.id', 'title', 'type', 'description']],
            'exercises' => [Exercise::class, ['exercises.id', 'title', 'duration', 'rating', 'type', 'description']],
            'recipes'   => [Recipe::class,   ['recipes.id', 'title', 'duration', 'rating', 'type', 'description']],
            'audio'     => [Audio::class,    ['audio.id', 'title', 'duration', 'rating', 'type', 'description']],
        ];

        $favorites = collect();

        $selectedTypes = $types ?: array_keys($map);

        foreach ($selectedTypes as $type) {
            if (! isset($map[$type])) {
                continue;
            }

            [$class, $columns] = $map[$type];
            $favorites = $favorites->merge(
                User::favoriteRelation($user, $class, $columns)
                    ->get()
                    ->map(function ($item) use ($type) {
                        if ($type === 'articles') {
                            $item->favorite_type = $item->type->value . '.'. $type;
                        } else {
                            $item->favorite_type = $type;
                        }
                        return $item;
                    })
            );
        }

        $page = request('page', 1);
        $perPage = 6;
        $offset = ($page - 1) * $perPage;

        return new LengthAwarePaginator(
            $favorites->slice($offset, $perPage)->values(),
            $favorites->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );
    }
}
