import ContentCard from '@/components/user/atoms/content-card';
import NoItems from '@/components/user/atoms/no-items';
import Pagination from '@/components/user/atoms/pagination';
import { PaginationMeta } from '@/lib/types/pagination';
import { Article, Audio, Exercise, Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';
import FavoriteMenu from '../molecules/favorite-menu';

type Favorite = (Article | Audio | Exercise | Recipe) & {
    favorite_type: string;
};

export default function FavoriteList() {
    const { favorites } = usePage<{ favorites: PaginationMeta<Favorite> }>()
        .props;

    return (
        <div className="lg:flex lg:items-start lg:gap-5">
            <FavoriteMenu className="hidden lg:grid" />

            <div
                id="favorites"
                className="w-full scroll-mt-80 md:scroll-mt-52 xl:mx-auto xl:max-w-250"
            >
                {favorites.data.length > 0 ? (
                    <>
                        <ul className="grid w-full shrink-0 grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))] gap-6 xl:grid-cols-3">
                            {favorites.data.map((item) => (
                                <ContentCard
                                    key={`${item.id}-${item.favorite_type}`}
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
                                            'duration' in item
                                                ? item.duration
                                                : undefined,
                                        rating:
                                            'rating' in item
                                                ? item.rating
                                                : undefined,
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
                            label="секции"
                            className="mx-auto max-w-330 text-white"
                            shouldScroll={false}
                            scrollElementId='favorites'
                        />
                    </>
                ) : (
                    <NoItems />
                )}
            </div>
        </div>
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
