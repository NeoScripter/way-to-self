import TinyDumbbells from '@/assets/images/body/account-body-dumbells-tiny.webp';
import Dumbbells from '@/assets/images/body/account-body-dumbells.webp';
import TinyRope from '@/assets/images/body/account-body-jumping-rope-tiny.webp';
import Rope from '@/assets/images/body/account-body-jumping-rope.webp';
import TinyLeaf from '@/assets/images/body/account-body-leaf-tiny.webp';
import Leaf from '@/assets/images/body/account-body-leaf.webp';
import TinyTape from '@/assets/images/body/account-body-tape-tiny.webp';
import Tape from '@/assets/images/body/account-body-tape.webp';
import DesktopTinyBg from '@/assets/images/food/nutrition-recipe-bg-tiny.webp';
import DesktopBg from '@/assets/images/food/nutrition-recipe-bg.webp';
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
import { Exercise } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Exercises() {
    const { exercises, menuItems } = usePage<{
        exercises: PaginationMeta<Exercise>;
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
                img={Leaf}
                tinyImg={TinyLeaf}
                className="top-160 left-0 z-10 w-3/5 max-w-120 min-w-80 xl:top-200 xl:w-2/5 xl:max-w-160 2xl:top-250"
            />
            <ArtLayer
                img={Dumbbells}
                tinyImg={TinyDumbbells}
                className="top-0 -right-10 hidden w-1/3 sm:block md:w-80 xl:top-10 2xl:w-100"
            />
            <ArtLayer
                img={Rope}
                tinyImg={TinyRope}
                className="right-0 bottom-60 w-3/5 max-w-172 md:w-2/5"
            />
            <ArtLayer
                img={Tape}
                tinyImg={TinyTape}
                className="bottom-100 -left-5 w-3/5 max-w-122 sm:bottom-130 sm:-left-13 sm:max-w-150 xl:-left-10"
            />

            <Breadcrumbs
                className="my-7 sm:my-11 md:my-15 xl:my-18"
                labels={['Главная', 'Тело', 'Упражнения']}
                highlightClass="text-light-swamp"
            />
            <section className="relative z-10">
                <h1
                    className={cn(
                        'relative z-20 -mx-3 mb-7 block sm:mb-11 md:mb-15 xl:mb-18',
                    )}
                >
                    <SpanHighlight
                        text="Упражнения"
                        className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                    />
                </h1>

                <SearchBox
                    routeName="body.exercises"
                    className="my-10 md:my-15 xl:my-20"
                />
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
                        propName="exercises"
                    />

                    <CategoryList
                        items={exercises}
                        href="body.exercises.show"
                        label="упражнения"
                        scrollElementId="exercises"
                        type="exercise"
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
                    propName="exercises"
                    onClose={() => toggleMenu(false)}
                    className="rounded-l-none bg-light-swamp/80 text-white"
                />
            </SlideLayout>
        </AppLayout>
    );
}
