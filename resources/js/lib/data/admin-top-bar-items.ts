import { v4 as v4uuid } from 'uuid';

export type BarMenuItem = {
    id: string;
    route: string;
    title: string;
};

export const barMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Рецепты',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Душа',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Упражнения',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Рецепты',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Душа',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Упражнения',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Рецепты',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Душа',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Упражнения',
    },
];

