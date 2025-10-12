import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import { v4 as v4uuid } from 'uuid';

export const bodyMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.body.faqs.index',
        title: 'Вопросы',
    },
    {
        id: v4uuid(),
        route: 'admin.body.exercises.index',
        title: 'Упражнения',
    },
    {
        id: v4uuid(),
        route: 'admin.body.categories.index',
        title: 'Категории У',
    },
    {
        id: v4uuid(),
        route: 'admin.body.exercise.filters.index',
        title: 'Фильтры У',
    },
    {
        id: v4uuid(),
        route: 'admin.body.programs.index',
        title: 'Программы',
    },
    {
        id: v4uuid(),
        route: 'admin.body.programs.filters.index',
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
        route: 'admin.body.articles.index',
        title: 'Советы',
    },
];
