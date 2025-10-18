import Articles from '@/assets/svgs/admin/admin-articles.svg';
import Body from '@/assets/svgs/admin/admin-body.svg';
import Dashboard from '@/assets/svgs/admin/admin-dashboard.svg';
import Editors from '@/assets/svgs/admin/admin-editors.svg';
import Food from '@/assets/svgs/admin/admin-food.svg';
import Home from '@/assets/svgs/admin/admin-home.svg';
import Plans from '@/assets/svgs/admin/admin-plans.svg';
import Profile from '@/assets/svgs/admin/admin-profile.svg';
import Promo from '@/assets/svgs/admin/admin-promo.svg';
import Soul from '@/assets/svgs/admin/admin-soul.svg';
import Users from '@/assets/svgs/admin/admin-users.svg';
import Bot from '@/assets/svgs/bot.svg';
import { v4 as uuidv4 } from 'uuid';

export type AdminMenuList = {
    title: string;
    id: string;
    items: AdminMenuItem[];
};

export type AdminMenuItem = {
    id: string;
    title: string;
    route: string;
    icon: string;
    allowed: string[];
};

export const adminMenu: AdminMenuList[] = [
    {
        id: uuidv4(),
        title: 'Администрирование',
        items: [
            {
                id: uuidv4(),
                title: 'Личные данные',
                route: 'admin.profile',
                icon: Profile,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Статистика',
                route: 'admin.dashboard',
                icon: Dashboard,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Администраторы',
                route: 'admin.editors.index',
                icon: Editors,
                allowed: ['admin'],
            },
            {
                id: uuidv4(),
                title: 'Пользователи',
                route: 'admin.users.index',
                icon: Users,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Промокоды',
                route: 'admin.promos.index',
                icon: Promo,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Тарифы',
                route: 'admin.plans.index',
                icon: Plans,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Телеграм-бот',
                route: 'admin.bot.soul.index',
                icon: Bot,
                allowed: ['admin', 'editor'],
            },
        ],
    },
    {
        id: uuidv4(),
        title: 'Управление',
        items: [
            {
                id: uuidv4(),
                title: 'Главная',
                route: 'admin.home.overview.show',
                icon: Home,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Питание',
                route: 'admin.nutrition.faqs.index',
                icon: Food,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Душа',
                route: 'admin.soul.faqs.index',
                icon: Soul,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Тело',
                route: 'admin.body.faqs.index',
                icon: Body,
                allowed: ['admin', 'editor'],
            },
            {
                id: uuidv4(),
                title: 'Статьи',
                route: 'admin.news.articles.index',
                icon: Articles,
                allowed: ['admin', 'editor'],
            },
        ],
    },
];
