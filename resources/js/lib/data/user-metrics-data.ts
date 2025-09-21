import { UserMetricsProps } from '@/pages/admin/dashboard';
import { v4 as v4uuid } from 'uuid';
import Ghost from '@/assets/svgs/admin/admin-metrics-ghost.svg';
import User from '@/assets/svgs/admin/admin-metrics-user.svg';
import Clock from '@/assets/svgs/admin/admin-metrics-auto-update.svg';

export const userMetrics: UserMetricsProps[] = [
    {
        id: v4uuid(),
        title: "Пользователи с подпиской",
        icon: User,
        quantity: 221,
        diff: 32
    },
    {
        id: v4uuid(),
        title: "Пользователи без подписки",
        icon: Ghost,
        quantity: 420,
        diff: 12
    },
    {
        id: v4uuid(),
        title: "Пользователи с автопродлением",
        icon: Clock,
        quantity: 12,
        diff: 3
    },
]
