import DesktopTinyBg from '@/assets/images/food/nutrition-recipe-bg-tiny.webp';
import DesktopBg from '@/assets/images/food/nutrition-recipe-bg.webp';
import BellPepper from '@/assets/images/home/veggies/bell-pepper.webp';
import CutChili from '@/assets/images/home/veggies/cut-chilli.webp';
import Tomatoes from '@/assets/images/home/veggies/tomatoes.webp';
import SearchBox from '@/components/account/atoms/search-box';
import CategoryFilters from '@/components/account/molecules/category-filters';
import CategoryList from '@/components/account/molecules/category-list';
import BgImage from '@/components/shared/atoms/bg-image';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import ArtLayer from '@/components/user/atoms/art-layer';
import DarkBtn from '@/components/user/atoms/dark-btn';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import SlideLayout from '@/components/user/molecules/slide-layout';
import useToggle from '@/hooks/use-toggle';
import AppLayout from '@/layouts/user/app-layout';
import { MenuItem } from '@/lib/data/account-menu-items';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Recipes() {
    const { recipes, menuItems } = usePage<{
        recipes: PaginationMeta<Recipe>;
        menuItems: MenuItem[];
    }>().props;
    const [showMenu, toggleMenu] = useToggle(false);

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
                pictureClass="size-full object-cover"
                imageClass="size-full object-cover"
            />

            <ArtLayer
                img={CutChili}
                className="top-1/3 left-10 z-10 w-3/5 max-w-120 min-w-60"
            />
            <ArtLayer
                img={Tomatoes}
                className="top-60 -right-15 w-1/2 md:w-100"
            />
            <ArtLayer
                img={BellPepper}
                className="bottom-1/4 -left-5 w-3/5 max-w-102 sm:-left-13 xl:-left-10"
            />

            <Breadcrumbs
                className="my-7 sm:my-11 md:my-15 xl:my-18"
                labels={['Главная', 'Питание', 'Рецепты']}
                highlightClass="text-light-swamp"
            />
            <section className="relative z-10">
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

                <SearchBox className='my-10 md:my-15 xl:my-20' />
                <DarkBtn
                    onClick={() => toggleMenu(true)}
                    className="mx-auto my-10 px-[2em] text-sm md:my-15 md:text-base lg:hidden"
                >
                    Фильтры
                </DarkBtn>

                <div className="relative z-10 lg:flex lg:items-start lg:gap-5">
                    <CategoryFilters
                        key="desktop-category-filters"
                        items={menuItems}
                        className="hidden lg:grid"
                        propName="recipes"
                    />

                    <CategoryList
                        items={recipes}
                        href="nutrition.recipes.show"
                        label="рецепта"
                        scrollElementId="favorites"
                        type="recipe"
                    />
                </div>
            </section>

            <SlideLayout
                onClose={() => toggleMenu(false)}
                show={showMenu}
                className="lg:hidden"
            >
                <CategoryFilters
                    key="mobile-category-filters"
                    items={menuItems}
                    propName="recipes"
                    onClose={() => toggleMenu(false)}
                    className="rounded-l-none bg-light-swamp/80 text-white"
                />
            </SlideLayout>
        </AppLayout>
    );
}
