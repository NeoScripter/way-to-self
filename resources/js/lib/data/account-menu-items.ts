import { v4 as v4uuid } from 'uuid';

export type MenuSubItem = {
    id: string;
    type: string;
    label: string;
};

export type MenuItem = {
    id: string;
    title: string;
    items: MenuSubItem[];
};

export const menuItems = [
    {
        id: v4uuid(),
        title: 'Питание',
        items: [
            {
                id: v4uuid(),
                type: 'recipes',
                label: 'Рецепты',
            },
        ],
    },
    {
        id: v4uuid(),
        title: 'Душа',
        items: [
            {
                id: v4uuid(),
                type: 'audio',
                label: 'Медитации',
            },
            {
                id: v4uuid(),
                type: 'practices',
                label: 'Практики',
            },
        ],
    },
    {
        id: v4uuid(),
        title: 'Тело',
        items: [
            {
                id: v4uuid(),
                type: 'exercises',
                label: 'Упражнения',
            },
            {
                id: v4uuid(),
                type: 'programs',
                label: 'Программы',
            },
        ],
    },
    {
        id: v4uuid(),
        title: 'Статьи',
        items: [
            {
                id: v4uuid(),
                type: 'articles',
                label: 'Статьи',
            },
        ],
    },
];
