import ContentCard from '@/components/user/atoms/content-card';
import { Article, Audio, Exercise, Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';

type Favorites = {
    'articles': Article[];
    'recipes': Recipe[];
    'exercises': Exercise[];
    'audio': Audio[];
}

export default function FavoriteList() {
    const { favorites } = usePage<{ favorites: Favorites }>().props;

    return (
        <ul className="grid grid-cols-3 gap-6">
            {Object.entries(favorites).map(([type, items]) =>
                items.map((item) => (
                    <ContentCard
                        key={`${type}-${item.id}`}
                        type={type}
                        className="mx-auto"
                        data={{
                            href: getHref(type, item),
                            name: item.title,
                            img: item.image?.path,
                            tinyImg: item.image?.tiny_path,
                            alt: item.image?.alt,
                            description: item.description,
                            duration: item.duration,
                            rating: item.rating,
                            category: item.category?.name,
                        }}
                    />
                )),
            )}
        </ul>
    );
}

function getHref(type, item) {
    switch (type) {
        case "articles":
            return route("user.articles.show", item);
        case "exercises":
            return route("user.exercises.show", item);
        case "audio":
            return "#";
        case "recipes":
            return route("user.recipes.show", item);
        default:
            return "#";
    }
}
