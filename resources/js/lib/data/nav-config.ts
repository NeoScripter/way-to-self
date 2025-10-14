export const navConfig: Record<string, { route: string; forms: string[] }> = {
    plans: {
        route: 'admin.plans.index',
        forms: ['тариф', 'тарифа', 'тарифов'],
    },
    promos: {
        route: 'admin.promos.index',
        forms: ['промокод', 'промокода', 'промокодов'],
    },
    users: {
        route: 'admin.users.index',
        forms: ['аккаунт', 'аккаунта', 'аккаунтов'],
    },
    editors: {
        route: 'admin.editors.index',
        forms: ['админ', 'админа', 'админов'],
    },
    articles_news: {
        route: 'admin.news.articles.index',
        forms: ['статья', 'статьи', 'статей'],
    },
    articles_body: {
        route: 'admin.body.articles.index',
        forms: ['статья', 'статьи', 'статей'],
    },
    articles_nutrition: {
        route: 'admin.nutrition.articles.index',
        forms: ['статья', 'статьи', 'статей'],
    },
    articles_soul: {
        route: 'admin.soul.articles.index',
        forms: ['статья', 'статьи', 'статей'],
    },
    exercises: {
        route: 'admin.body.exercises.index',
        forms: ['упражнение', 'упражнения', 'упражнений'],
    },
    practices: {
        route: 'admin.soul.practices.index',
        forms: ['практика', 'практики', 'практик'],
    },
    programs: {
        route: 'admin.body.programs.index',
        forms: ['программа', 'программы', 'программ'],
    },
    recipes: {
        route: 'admin.nutrition.recipes.index',
        forms: ['рецепт', 'рецепта', 'рецептов'],
    },
    audios: {
        route: 'admin.soul.audios.index',
        forms: ['медитация', 'медитации', 'медитаций'],
    },
    reviews: {
        route: 'admin.home.reviews.index',
        forms: ['отзыв', 'отзыва', 'отзывов'],
    },
};
