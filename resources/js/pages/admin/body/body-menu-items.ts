import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import { v4 as v4uuid } from 'uuid';

export const bodyMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.body.faqs.index',
        title: 'Вопросы',
    },
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
        route: 'admin.body.articles.index',
        title: 'Советы',
    },
];
