import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import { v4 as v4uuid } from 'uuid';

export const legalMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.legal.consent.index',
        title: 'Согласие',
    },
    {
        id: v4uuid(),
        route: 'admin.legal.offer.index',
        title: 'Оферта',
    },
    {
        id: v4uuid(),
        route: 'admin.legal.policy.index',
        title: 'Политика',
    },
];
