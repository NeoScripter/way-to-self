import Avocado from '@/assets/images/home/veggies/avocado.webp';
import BellPepper from '@/assets/images/home/veggies/bell-pepper.webp';
import BerryLeaves from '@/assets/images/home/veggies/berry-leaves.webp';
import CarrotBottom from '@/assets/images/home/veggies/bottom-carrot.webp';
import BottomRadish from '@/assets/images/home/veggies/bottom-radish.webp';
import BottomWholeChilli from '@/assets/images/home/veggies/bottom-whole-chilli.webp';
import CutBellPepper from '@/assets/images/home/veggies/cut-bell-pepper.webp';
import CutChili from '@/assets/images/home/veggies/cut-chilli.webp';
import Laurel from '@/assets/images/home/veggies/laurel.webp';
import CarrotMiddle from '@/assets/images/home/veggies/middle-carrot.webp';
import MiddleRadish from '@/assets/images/home/veggies/middle-radish.webp';
import MiddleWholeChilli from '@/assets/images/home/veggies/middle-whole-chilli.webp';
import RightRadish from '@/assets/images/home/veggies/right-radish.webp';
import Tomatoes from '@/assets/images/home/veggies/tomatoes.webp';
import CarrotTop from '@/assets/images/home/veggies/top-carrot.webp';
import TopWholeChilli from '@/assets/images/home/veggies/top-whole-chilli.webp';
import ArtLayer from '@/components/user/atoms/art-layer';
import BackgroundHome from '@/components/user/atoms/background-home';
import ArticlesSection from '@/components/user/organisms/home/articles-section';
import BodySection from '@/components/user/organisms/home/body-section';
import FoodSection from '@/components/user/organisms/home/food-section';
import HeroSection from '@/components/user/organisms/home/hero-section';
import IntroSection from '@/components/user/organisms/home/intro-section';
import RatesSection from '@/components/user/organisms/home/rates-section';
import ReviewsSection from '@/components/user/organisms/home/reviews-section';
import SoulSection from '@/components/user/organisms/home/soul-section';
import FAQSection from '@/components/user/organisms/shared/faq-section';
import UserLayout from '@/layouts/user/user-layout';
import { cn } from '@/lib/utils';

export default function Home() {


    return (
        <UserLayout
            layoutClass="text-text-black bg-main-page-bg"
            pageClass="px-4 sm:px-11 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <BackgroundHome />

            <AppSection className="text-white">
                <HeroSection />
            </AppSection>

            <AppSection
                className="relative text-white"
                ariaLabelledBy="intro-heading"
            >
                <IntroSection />

                <ArtLayer
                    img={CarrotTop}
                    className="bottom-80 -left-10 w-3/5 max-w-100"
                />
                <ArtLayer
                    img={CarrotMiddle}
                    className="bottom-30 -left-20 w-3/5 max-w-120 sm:bottom-30 md:bottom-20"
                />
                <ArtLayer
                    img={CarrotBottom}
                    className="right-0 -bottom-30 w-62 sm:right-auto sm:left-0 lg:-bottom-50 lg:w-80"
                />
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="nutrition-section-title"
            >
                <FoodSection />

                <ArtLayer
                    img={CutChili}
                    className="top-50 -right-10 z-10 w-3/5 max-w-105 min-w-60 sm:top-10 xl:-top-50 xl:-right-20 2xl:-right-40"
                />
                <ArtLayer
                    img={Tomatoes}
                    className="right-5 hidden w-100 xl:bottom-40 xl:block"
                />
                <ArtLayer
                    img={BerryLeaves}
                    className="top-1/4 -right-1/3 w-full max-w-140 sm:top-1/2 lg:top-auto lg:right-auto lg:-bottom-80 lg:-left-20"
                />
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="soul-section-title"
            >
                <SoulSection />

                <ArtLayer
                    img={Laurel}
                    className="-right-30 -bottom-40 z-12 hidden w-75 sm:block md:-right-20 xl:-right-20 xl:-bottom-35 xl:w-100"
                />
                <ArtLayer
                    img={BellPepper}
                    className="top-1/4 -left-5 w-3/5 max-w-102 sm:-left-13 xl:top-auto xl:-bottom-70 xl:-left-60"
                />
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="body-section-title"
            >
                <BodySection />

                <ArtLayer
                    img={Avocado}
                    className="bottom-1/4 left-3/5 w-5/3 max-w-220 -translate-x-1/2 md:bottom-60 md:w-full 2xl:-bottom-50"
                />
                <ArtLayer
                    img={RightRadish}
                    className="top-1/4 -right-20 w-75 md:hidden xl:top-2/5 xl:-right-40 xl:block"
                />
                <ArtLayer
                    img={MiddleRadish}
                    className="top-1/4 right-30 w-50 md:hidden xl:top-2/5 xl:right-10 xl:block"
                />
                <ArtLayer
                    img={BottomRadish}
                    className="top-1/4 right-30 hidden w-50 xl:top-3/5 xl:right-10 xl:block 2xl:top-4/5"
                />
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="rates-section-title"
            >
                <RatesSection />

                <ArtLayer
                    img={Tomatoes}
                    className="right-0 bottom-1/3 w-1/2 max-w-75 md:right-auto md:bottom-1/2 md:left-0 xl:hidden"
                />
                <ArtLayer
                    img={RightRadish}
                    className="top-1/2 -right-30 hidden w-75 md:block xl:hidden"
                />
                <ArtLayer
                    img={MiddleRadish}
                    className="top-1/2 -right-0 hidden w-50 md:block xl:hidden"
                />
                <ArtLayer
                    img={CutBellPepper}
                    className="top-1/5 -right-20 w-3/5 max-w-102 sm:top-0 sm:right-auto sm:-left-20 xl:top-auto xl:-bottom-40"
                />
            </AppSection>

            <AppSection
                className="-mx-4 text-text-black sm:-mx-11 2xl:-mx-25 3xl:-mx-40"
                ariaLabelledBy="reviews-section-title"
            >
                <ReviewsSection />
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="faq-section-title"
            >
                <FAQSection />

                <ArtLayer
                    img={TopWholeChilli}
                    className="-top-15 -left-5 w-15 md:w-20 lg:-top-40 3xl:-left-30"
                />
                <ArtLayer
                    img={MiddleWholeChilli}
                    className="-top-15 left-5 w-25 md:w-40 lg:-top-40 3xl:-left-10"
                />
                <ArtLayer
                    img={BottomWholeChilli}
                    className="-top-0 left-15 w-15 md:w-20 lg:-top-30 3xl:-left-10"
                />
            </AppSection>

            <AppSection ariaLabelledBy="articles-section-title">
                <ArticlesSection />
            </AppSection>
        </UserLayout>
    );
}

type AppSectionProps = {
    className?: string;
    children: React.ReactNode;
    ariaLabelledBy?: string;
};

function AppSection({ className, children, ariaLabelledBy }: AppSectionProps) {
    return (
        <section
            {...(ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : {})}
            className={cn(
                'my-11 sm:my-14 md:my-20 lg:my-26 xl:my-40',
                className,
            )}
        >
            {children}
        </section>
    );
}
