<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ArticleType;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Audio;
use App\Models\Exercise;
use App\Models\Practice;
use App\Models\Program;
use App\Models\Recipe;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $twoWeeksAgo = now()->subWeeks(2);
        $monthAgo = now()->subMonth();

        // 1. Exclude admins/editors
        $adminEditorRoleIds = Role::whereIn('name', [
            RoleEnum::ADMIN->value,
            RoleEnum::EDITOR->value,
        ])->pluck('id');

        /*
         * 2. Users with auto-renewal
         */
        $autoRenewStats = DB::table('tier_user')
            ->selectRaw("
            SUM(CASE WHEN auto_update = 1 THEN 1 ELSE 0 END) as current,
            SUM(CASE WHEN auto_update = 1 AND auto_update_set_at <= ? THEN 1 ELSE 0 END) as past
        ", [$twoWeeksAgo])
            ->first();

        $autoRenewCurrent = (int) $autoRenewStats->current;
        $autoRenewPast    = (int) $autoRenewStats->past;
        $autoRenewDiff    = $autoRenewCurrent - $autoRenewPast;

        /*
         * 3. Users without active subscriptions
         */
        $usersWithoutSubscription = DB::table('users')
            ->leftJoin('tier_user', 'users.id', '=', 'tier_user.user_id')
            ->leftJoin('role_user', 'users.id', '=', 'role_user.user_id')
            ->select('users.id', DB::raw('MAX(tier_user.expires_at) as max_expires_at'))
            ->groupBy('users.id')
            ->havingRaw(
                '( (max_expires_at IS NULL AND users.created_at < ?) OR max_expires_at < ? )',
                [$twoWeeksAgo, $twoWeeksAgo]
            )
            ->whereNotIn('role_user.role_id', $adminEditorRoleIds)
            ->pluck('users.id'); // just ids, no need for full rows

        $withoutSubscriptionCount = $usersWithoutSubscription->count();

        /*
         * 4. Users with subscriptions = total non-admin/editor users - without subscription
         */
        $nonAdminEditorUsers = DB::table('users')
            ->leftJoin('role_user', 'users.id', '=', 'role_user.user_id')
            ->whereNotIn('role_user.role_id', $adminEditorRoleIds)
            ->count('users.id');

        $withSubscriptionCount = $nonAdminEditorUsers - $withoutSubscriptionCount;

        $nonAdminEditorUsersPast = DB::table('users')
            ->join('role_user', 'users.id', '=', 'role_user.user_id')
            ->where('users.created_at', '<', $twoWeeksAgo)
            ->whereNotIn('role_user.role_id', $adminEditorRoleIds)
            ->count('users.id');

        /*
         * 5. Differences (compared to two weeks ago)
         */
        $withoutSubscriptionPast = DB::table('users')
            ->leftJoin('tier_user', 'users.id', '=', 'tier_user.user_id')
            ->leftJoin('role_user', 'users.id', '=', 'role_user.user_id')
            ->select('users.id', DB::raw('MAX(tier_user.expires_at) as max_expires_at'))
            ->groupBy('users.id')
            ->havingRaw(
                '( (max_expires_at IS NULL AND users.created_at < ?) OR max_expires_at < ? )',
                [$twoWeeksAgo, $twoWeeksAgo]
            )
            ->whereNotIn('role_user.role_id', $adminEditorRoleIds)
            ->pluck('users.id')
            ->count();

        $withSubscriptionPast = $nonAdminEditorUsersPast - $withoutSubscriptionPast;

        $withSubscriptionDiff    = $withSubscriptionCount - $withSubscriptionPast;
        $withoutSubscriptionDiff = $withoutSubscriptionCount - $withoutSubscriptionPast;

        /*
         * 6. Prepare data for Inertia
         */
        $userData = [
            [
                'id'       => Str::uuid(),
                'title'    => 'Пользователи с подпиской',
                'icon'     => 'User',
                'quantity' => $withSubscriptionCount,
                'diff'     => $withSubscriptionDiff,
            ],
            [
                'id'       => Str::uuid(),
                'title'    => 'Пользователи без подписки',
                'icon'     => 'Ghost',
                'quantity' => $withoutSubscriptionCount,
                'diff'     => $withoutSubscriptionDiff,
            ],
            [
                'id'       => Str::uuid(),
                'title'    => 'Пользователи с автопродлением',
                'icon'     => 'Clock',
                'quantity' => $autoRenewCurrent,
                'diff'     => $autoRenewDiff,
            ],
        ];


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
            'userData' => $userData,
            'tierData' => $tierData
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
