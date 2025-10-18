import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import { v4 as v4uuid } from 'uuid';

export const botMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.bot.soul.index',
        title: 'Душа',
    },
    {
        id: v4uuid(),
        route: 'admin.bot.body.index',
        title: 'Тело',
    },
    {
        id: v4uuid(),
        route: 'admin.bot.nutrition.index',
        title: 'Питание',
    },
];
