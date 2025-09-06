import SandDesktopTinyBg from '@/assets/images/food/nutrition-recipe-bg-tiny.webp';
import SandDesktopBg from '@/assets/images/food/nutrition-recipe-bg.webp';
import SearchBox from '@/components/account/atoms/search-box';
import BgImage from '@/components/shared/atoms/bg-image';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { cn } from '@/lib/utils';

export default function Search() {
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
                pictureClass="size-full object-cover"
                imageClass="size-full object-cover"
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
                    <SearchBox />
                </div>

                <h2 className="text-black my-10 sm:my-17 block font-heading font-medium text-3xl sm:text-4xl lg:text-5xl">По вашему запросу найдено:</h2>
            </section>
        </AppLayout>
    );
}
