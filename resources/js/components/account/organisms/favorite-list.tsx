import ContentCard from '@/components/user/atoms/content-card';
import Pagination from '@/components/user/atoms/pagination';
import { PaginationMeta } from '@/lib/types/pagination';
import { Article, Audio, Exercise, Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';

type Favorite = (Article | Audio | Exercise | Recipe) & {
    favorite_type: string;
};

export default function FavoriteList() {
    const { favorites } = usePage<{ favorites: PaginationMeta<Favorite> }>().props;

    return (
        <>
            <ul className="grid grid-cols-3 gap-6">
                {favorites.data.map((item) => (
                    <ContentCard
                        key={`${item.id}`}
                        type={''}
                        className="mx-auto"
                        data={{
                            href: getHref(item),
                            name: item.title,
                            img: item.image?.path,
                            tinyImg: item.image?.tiny_path,
                            alt: item.image?.alt,
                            description: item.description,
                            duration:
                                'duration' in item ? item.duration : undefined,
                            rating: 'rating' in item ? item.rating : undefined,
                            category:
                                'category' in item
                                    ? item.category?.name
                                    : undefined,
                        }}
                    />
                ))}
            </ul>

            <Pagination
                meta={favorites}
                label="избранное"
                className="mx-auto text-white max-w-330"
            />
        </>
    );
}

function getHref(item: Favorite) {
    switch (item.favorite_type) {
        case 'articles':
            return route('user.articles.show', item);
        case 'exercises':
            return route('user.exercises.show', item);
        case 'audio':
            return '#';
        case 'recipes':
            return route('user.recipes.show', item);
        default:
            return '#';
    }
}
