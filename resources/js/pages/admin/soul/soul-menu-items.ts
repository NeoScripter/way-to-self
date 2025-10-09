import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import { v4 as v4uuid } from 'uuid';

export const soulMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.soul.faqs.index',
        title: 'Вопросы',
    },
    {
        id: v4uuid(),
        route: 'admin.soul.audios.filters.index',
        title: 'Фильтры М',
    },
    {
        id: v4uuid(),
        route: 'admin.practices.index',
        title: 'Практики',
    },
    {
        id: v4uuid(),
        route: 'admin.soul.practices.filters.index',
        title: 'Фильтры П',
    },
    // {
    //     id: v4uuid(),
    //     route: 'admin.dashboard',
    //     title: 'Душа',
    // },
    // {
    //     id: v4uuid(),
    //     route: 'admin.dashboard',
    //     title: 'Упражнения',
    // },
    // {
    //     id: v4uuid(),
    //     route: 'admin.dashboard',
    //     title: 'Рецепты',
    // },
    // {
    //     id: v4uuid(),
    //     route: 'admin.dashboard',
    //     title: 'Душа',
    // },
    // {
    //     id: v4uuid(),
    //     route: 'admin.dashboard',
    //     title: 'Упражнения',
    // },
    // {
    //     id: v4uuid(),
    //     route: 'admin.dashboard',
    //     title: 'Рецепты',
    // },
    {
        id: v4uuid(),
        route: 'admin.soul.articles.index',
        title: 'Советы',
    },
];
