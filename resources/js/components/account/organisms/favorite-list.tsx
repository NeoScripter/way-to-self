import ContentCard from '@/components/user/atoms/content-card';
import NoItems from '@/components/user/atoms/no-items';
import Pagination from '@/components/user/atoms/pagination';
import { menuItems } from '@/lib/data/account-menu-items';
import { PaginationMeta } from '@/lib/types/pagination';
import { Article, Audio, Exercise, Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';
import CategoryFilters from '../molecules/category-filters';

type Favorite = (Article | Audio | Exercise | Recipe) & {
    favorite_type: string;
};

export default function FavoriteList() {
    const { favorites } = usePage<{ favorites: PaginationMeta<Favorite> }>()
        .props;

    return (
        <div className="lg:flex lg:items-start lg:gap-5">
            <CategoryFilters
                key="desktop-category-filters"
                items={menuItems}
                propName="favorites"
                className="hidden lg:grid"
            />

            <div
                id="favorites"
                className="w-full scroll-mt-80 md:scroll-mt-52 xl:mx-auto xl:max-w-250"
            >
                {favorites.data.length > 0 ? (
                    <>
                        <ul className="grid w-full shrink-0 gap-6 sm:grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] xl:grid-cols-3">
                            {favorites.data.map((item) => (
                                <ContentCard
                                    key={`${item.id}-${item.favorite_type}`}
                                    type={''}
                                    className="mx-auto w-full max-w-80"
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
                            scrollElementId="favorites"
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
