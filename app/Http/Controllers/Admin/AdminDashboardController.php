<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ArticleType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Practice;
use App\Models\Program;
use App\Models\Recipe;
use App\Models\TierUser;
use App\Models\VisitorLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'users_days' => 'nullable|integer|min:0',
            'subs_days' => 'nullable|integer|min:0',
            'visitors_days' => 'nullable|integer|min:0',
        ]);

        $uDays = $validated['users_days'] ?? 14;
        $sDays = $validated['subs_days'] ?? 14;
        $vDays = $validated['visitors_days'] ?? 14;

        $usersNow = TierUser::activeUsersSince(0);
        $subsNow = TierUser::activeSubscriptionsSince(0);
        $visitorsNow = VisitorLog::visitorsSince(0);
        $usersSince = TierUser::activeUsersSince($uDays);
        $subsSince = TierUser::activeSubscriptionsSince($sDays);
        $visitorsSince = VisitorLog::visitorsSince($vDays);

        $userData = [
            [
                'id'       => Str::uuid(),
                'title'    => 'Пользователи с подпиской',
                'icon'     => 'User',
                'quantity' => $usersNow,
                'diff'     => $usersNow - $usersSince,
                'paramName' => 'users_days',
            ],
            [
                'id'       => Str::uuid(),
                'title'    => 'Активные подписки',
                'icon'     => 'Ghost',
                'quantity' => $subsNow,
                'diff'     => $subsNow - $subsSince,
                'paramName' => 'subs_days',
            ],
            [
                'id'       => Str::uuid(),
                'title'    => 'Посетителей сайта',
                'icon'     => 'Clock',
                'quantity' => $visitorsNow,
                'diff'     => $visitorsNow - $visitorsSince,
                'paramName' => 'visitors_days',
            ],
        ];

        $twoWeeksAgo = now()->subWeeks(2);
        $monthAgo = now()->subMonth();

        $tierData = [
            $this->makeTierMetrics('Питание', [
                $this->makeSection(Recipe::class, 'рецепты', $twoWeeksAgo, $monthAgo),
                $this->makeSection(Article::class, 'статьи', $twoWeeksAgo, $monthAgo, [
                    ['column' => 'type', 'value' => ArticleType::NUTRITION],
                ]),
            ]),
            $this->makeTierMetrics('Душа', [
                $this->makeSection(Audio::class, 'аудио', $twoWeeksAgo, $monthAgo),
                $this->makeSection(Practice::class, 'практики', $twoWeeksAgo, $monthAgo),
                $this->makeSection(Article::class, 'статьи', $twoWeeksAgo, $monthAgo, [
                    ['column' => 'type', 'value' => ArticleType::SOUL],
                ]),
            ]),
            $this->makeTierMetrics('Тело', [
                $this->makeSection(Exercise::class, 'упражнения', $twoWeeksAgo, $monthAgo),
                $this->makeSection(Program::class, 'программы', $twoWeeksAgo, $monthAgo),
                $this->makeSection(Article::class, 'статьи', $twoWeeksAgo, $monthAgo, [
                    ['column' => 'type', 'value' => ArticleType::EXERCISE],
                ]),
            ]),
        ];

        return Inertia::render('admin/dashboard', [
            'userData' => fn() => $userData,
            'tierData' => fn() => $tierData
        ]);
    }

    /**
     * Build a section with counts.
     */
    protected function makeSection(
        string $modelClass,
        string $label,
        Carbon $twoWeeksAgo,
        Carbon $monthAgo,
        array $conditions = []
    ): array {
        $query = $modelClass::query();
        foreach ($conditions as $cond) {
            $query->where($cond['column'], $cond['value']);
        }

        $total     = (clone $query)->count();
        $twoWeeks  = (clone $query)->where('created_at', '<', $twoWeeksAgo)->count();
        $month     = (clone $query)->where('created_at', '<', $monthAgo)->count();

        return [
            'id'     => Str::uuid()->toString(),
            'fields' => [
                [
                    'id'            => Str::uuid()->toString(),
                    'label'         => "Все {$label}",
                    'value'         => $total,
                    'isHighlighted' => true,
                ],
                [
                    'id'            => Str::uuid()->toString(),
                    'label'         => "За 14 дней",
                    'value'         => $twoWeeks,
                    'isHighlighted' => false,
                ],
                [
                    'id'            => Str::uuid()->toString(),
                    'label'         => "За 30 дней",
                    'value'         => $month,
                    'isHighlighted' => false,
                ],
            ],
        ];
    }

    /**
     * Build tier card.
     */
    protected function makeTierMetrics(string $title, array $sections): array
    {
        return [
            'id'        => Str::uuid()->toString(),
            'title'    => $title,
            'sections' => $sections,
        ];
    }
}
