import SandDesktopTinyBg from '@/assets/images/food/nutrition-recipe-bg-tiny.webp';
import SandDesktopBg from '@/assets/images/food/nutrition-recipe-bg.webp';
import SearchBox from '@/components/account/atoms/search-box';
import BgImage from '@/components/shared/atoms/bg-image';
import LazyImage from '@/components/user/atoms/lazy-image';
import Pagination from '@/components/user/atoms/pagination';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Image } from '@/types/model';
import { Link, usePage } from '@inertiajs/react';

type Item = {
    id: string;
    title: string;
    description: string;
    image: Image;
    itemType: string;
};

export default function Search() {
    const { items, routeName } = usePage<{
        items: PaginationMeta<Item>;
        routeName: string;
    }>().props;

    return (
        <AppLayout
            variant="tier"
            layoutClass="text-white bg-light-sand"
            pageClass="px-4 pb-20 space-y-21 sm:space-y-35 md:space-y-28 xl:space-y-34 sm:pb-24 xl:pb-30 sm:px-11 2xl:px-25 3xl:px-40"
        >
            <BgImage
                containerClass="-z-10"
                desktopPath={SandDesktopBg}
                desktopTinyPath={SandDesktopTinyBg}
                mobilePath={SandDesktopBg}
                mobileTinyPath={SandDesktopTinyBg}
                pictureClass="size-full object-center object-cover"
                imageClass="size-full object-center object-cover"
            />

            <section>
                <h1
                    className={cn(
                        'relative z-20 -mx-3 mt-15 block sm:mt-25 lg:mt-30',
                    )}
                >
                    <SpanHighlight
                        text="Раздел питание"
                        className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                    />
                </h1>

                <div className="my-10 sm:my-17">
                    <SearchBox routeName={routeName} />
                </div>

                <h2 className="my-10 block font-heading text-3xl font-medium text-black sm:my-17 sm:text-4xl lg:text-5xl">
                    {items.data.length > 0
                        ? 'По вашему запросу найдено:'
                        : 'По вашему запросу ничего не найдено'}
                </h2>

                <ul className="space-y-12 text-text-black sm:space-y-15">
                    {items &&
                        items.data.map((item) => (
                            <SearchItem
                                key={item.id}
                                item={item}
                            />
                        ))}
                </ul>
                <Pagination
                    meta={items}
                    label="статьи"
                    className="mx-auto max-w-330 text-dark-green"
                />
            </section>
        </AppLayout>
    );
}

type SearchItemProps = {
    item: Item;
};

function SearchItem({ item }: SearchItemProps) {
    let label = '',
        routeName = '';
    switch (item.itemType) {
        case 'nutrition.article':
            ((label = 'статьи'), (routeName = 'nutrition.articles.show'));
            break;
        case 'recipe':
            ((label = 'рецепты'), (routeName = 'nutrition.recipes.show'));
            break;
        case 'audio':
            ((label = 'медитации'), (routeName = 'soul.audios.show'));
            break;
        case 'soul.article':
            ((label = 'статьи'), (routeName = 'soul.articles.show'));
            break;
        case 'practice':
            ((label = 'духовные практики'), (routeName = 'soul.practices.show'));
            break;
        case 'program':
            ((label = 'программы'), (routeName = 'body.programs.show'));
            break;
        case 'exercise':
            ((label = 'упражнения'), (routeName = 'body.exercises.show'));
            break;
    }
    return (
        <li className="">
            <h3 className="mb-4 text-xs font-medium text-dark-swamp sm:mb-5 sm:text-base">
                {label}
            </h3>
            <Link
                as="button"
                prefetch
                className="mb-7 cursor-pointer text-left font-semibold underline underline-offset-6 sm:mb-5 sm:text-2xl"
                href={route(routeName, item.id)}
            >
                {item.title}
            </Link>

            <p className="sm:text-xl">{item.description}</p>
            {item.image && (
                <LazyImage
                    img={item.image.path}
                    tinyImg={item.image.tiny_path}
                    alt={item.image.alt}
                    parentClass="max-w-100 mt-7 sm:mt-5 rounded-md"
                />
            )}
        </li>
    );
}
