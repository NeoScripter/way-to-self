import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import { v4 as v4uuid } from 'uuid';

export const nutritionMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.nutrition.faqs.index',
        title: 'Вопросы',
    },
    {
        id: v4uuid(),
        route: 'admin.nutrition.recipes.index',
        title: 'Рецепты',
    },
    {
        id: v4uuid(),
        route: 'admin.nutrition.categories.index',
        title: 'Категории Р',
    },
    {
        id: v4uuid(),
        route: 'admin.nutrition.filters.index',
        title: 'Фильтры',
    },
    {
        id: v4uuid(),
        route: 'admin.nutrition.articles.index',
        title: 'Советы',
    },
];
