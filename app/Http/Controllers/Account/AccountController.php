<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Recipe;
use App\Models\Tier;
use Carbon\Carbon;
use Illuminate\Http\Request;
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

        $favorites = $this->favorites($request);

        return Inertia::render('account/account', [
            'tiers' => fn() => Tier::select(['id', 'description', 'name', 'price'])->with(['image'])->latest()->get(),
            'purchased' => $selectedTiers,
            'articles' => $articles,
            'favorites' => $favorites,
        ]);
    }

    public function favorites(Request $request)
    {
        $user = Auth::user();
        $types = $request->input('types');

        $favorites = collect();

        $map = [
            'articles'  => 'favoriteArticles',
            'exercises' => 'favoriteExercises',
            'audio'     => 'favoriteAudio',
            'recipes'   => 'favoriteRecipes',
        ];

        $favorites = [];

        if ($types) {
            foreach ($types as $type) {
                if (isset($map[$type])) {
                    $favorites[$type] = $user->{$map[$type]}()->get();
                }
            }
        } else {
            foreach ($map as $type => $relation) {
                $favorites[$type] = $user->{$relation}()->get();
            }
        }

        return $favorites;
    }
}
