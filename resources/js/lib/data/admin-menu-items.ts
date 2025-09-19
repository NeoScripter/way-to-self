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
};

export const list: AdminMenuList[] = [
    {
        id: uuidv4(),
        title: 'Администрирование',
        items: [
            {
                id: uuidv4(),
                title: 'Личные данные',
                route: 'admin.dashboard',
                icon: Profile,
            },
            {
                id: uuidv4(),
                title: 'Статистика',
                route: 'admin.dashboard',
                icon: Dashboard,
            },
            {
                id: uuidv4(),
                title: 'Администраторы',
                route: 'admin.dashboard',
                icon: Editors,
            },
            {
                id: uuidv4(),
                title: 'Пользователи',
                route: 'admin.dashboard',
                icon: Users,
            },
            {
                id: uuidv4(),
                title: 'Промокоды',
                route: 'admin.dashboard',
                icon: Promo,
            },
            {
                id: uuidv4(),
                title: 'Тарифы',
                route: 'admin.dashboard',
                icon: Plans,
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
                route: 'admin.dashboard',
                icon: Home,
            },
            {
                id: uuidv4(),
                title: 'Питание',
                route: 'admin.dashboard',
                icon: Food,
            },
            {
                id: uuidv4(),
                title: 'Душа',
                route: 'admin.dashboard',
                icon: Soul,
            },
            {
                id: uuidv4(),
                title: 'Тело',
                route: 'admin.dashboard',
                icon: Body,
            },
            {
                id: uuidv4(),
                title: 'Новости',
                route: 'admin.dashboard',
                icon: Articles,
            },
        ],
    },
];
