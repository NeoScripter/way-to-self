import DesktopTinyBg from '@/assets/images/food/nutrition-recipe-bg-tiny.webp';
import DesktopBg from '@/assets/images/food/nutrition-recipe-bg.webp';
import BellPepper from '@/assets/images/home/veggies/bell-pepper.webp';
import CutChili from '@/assets/images/home/veggies/cut-chilli.webp';
import Tomatoes from '@/assets/images/home/veggies/tomatoes.webp';
import CategoryList from '@/components/account/molecules/categoryList';
import BgImage from '@/components/shared/atoms/bg-image';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import ArtLayer from '@/components/user/atoms/art-layer';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Recipes() {
    const { recipes } = usePage<{ recipes: PaginationMeta<Recipe> }>().props;

    return (
        <AppLayout
            variant="tier"
            layoutClass="text-white bg-light-sand"
            pageClass="px-4 pb-20 space-y-21 sm:space-y-35 md:space-y-28 xl:space-y-34 sm:pb-24 xl:pb-30 sm:px-11 2xl:px-25 3xl:px-40"
        >
            <BgImage
                desktopPath={DesktopBg}
                desktopTinyPath={DesktopTinyBg}
                mobilePath={DesktopBg}
                mobileTinyPath={DesktopTinyBg}
            />

            <ArtLayer
                img={CutChili}
                className="top-50 -right-10 z-10 w-3/5 max-w-105 min-w-60 sm:top-10 xl:-top-50 xl:-right-20 2xl:-right-40"
            />
            <ArtLayer
                img={Tomatoes}
                className="right-5 hidden w-100 xl:bottom-40 xl:block"
            />
            <ArtLayer
                img={BellPepper}
                className="top-1/4 -left-5 w-3/5 max-w-102 sm:-left-13 xl:top-auto xl:-bottom-70 xl:-left-60"
            />

            <Breadcrumbs
                className="my-7 sm:my-11 md:my-15 xl:my-18"
                labels={['Главная', 'Питание', 'Рецепты']}
            />
            <section>
                <h1
                    className={cn(
                        'relative z-20 -mx-3 mb-7 block sm:mb-11 md:mb-15 xl:mb-18',
                    )}
                >
                    <SpanHighlight
                        text="Рецепты"
                        className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                    />
                </h1>
            </section>

            <div className="lg:flex lg:items-start lg:gap-5">
                {/*<FavoriteMenu className="hidden lg:grid" />*/}

                <CategoryList
                    items={recipes}
                    getHref={getHref}
                    label="секции"
                    scrollElementId="favorites"
                />
            </div>
        </AppLayout>
    );
}

function getHref(item: Recipe) {
    return route('nutrition.recipes.show', item);
}
