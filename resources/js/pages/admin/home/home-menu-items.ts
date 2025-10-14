import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import { v4 as v4uuid } from 'uuid';

export const homeMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.home.overview.show',
        title: 'Видео',
    },
    {
        id: v4uuid(),
        route: 'admin.home.reviews.index',
        title: 'Отзывы',
    },
    {
        id: v4uuid(),
        route: 'admin.home.faqs.index',
        title: 'Вопросы',
    },
];
