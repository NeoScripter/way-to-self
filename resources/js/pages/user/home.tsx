import BellPepper from '@/assets/images/home/veggies/bell-pepper.webp';
import Laurel from '@/assets/images/home/veggies/laurel.webp';
import ErrorFallback from '@/components/shared/molecules/error-fallback';
import FAQSection from '@/components/shared/organisms/faq-section';
import ArtLayer from '@/components/user/atoms/art-layer';
import AudioPlayer from '@/components/user/atoms/audio-player';
import HomeBackground from '@/components/user/atoms/home-background';
import ArticlesSection from '@/components/user/organisms/articles-section';
import BodySection from '@/components/user/organisms/body-section';
import EntryIntro from '@/components/user/organisms/entry-intro';
import FoodSection from '@/components/user/organisms/food-section';
import HeroSection from '@/components/user/organisms/hero-section';
import IntroSection from '@/components/user/organisms/intro-section';
import RatesSection from '@/components/user/organisms/rates-section';
import ReviewsSection from '@/components/user/organisms/reviews-section';
import AppLayout from '@/layouts/user/app-layout';
import { soulCardData } from '@/lib/data/card-data';
import { cn } from '@/lib/utils';
import { Article, Review } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { ErrorBoundary } from 'react-error-boundary';

export default function Home() {
    const { articles, reviews } = usePage<{
        articles: Article[];
        reviews: Review[];
    }>().props;

    return (
        <AppLayout
            variant="guest"
            layoutClass="text-text-black bg-main-page-bg"
            pageClass="px-4 sm:px-11 2xl:px-25 3xl:px-40"
        >
            <HomeBackground />

            <AppSection className="text-white">
                <HeroSection />
            </AppSection>

            <AppSection
                className="relative text-white"
                ariaLabelledBy="intro-heading"
            >
                <IntroSection />
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="nutrition-section-title"
            >
                <FoodSection />
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="soul-section-title"
            >
                <EntryIntro
                    entryKey={'soul'}
                    cards={soulCardData}
                    title='Раздел "Душа"'
                    heading="Пример медитации"
                />

                <AudioPlayer className="relative z-11" />

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
            </AppSection>

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="rates-section-title"
            >
                <RatesSection />
            </AppSection>

            {reviews.length > 0 && (
                <AppSection
                    className="-mx-4 text-text-black sm:-mx-11 2xl:-mx-25 3xl:-mx-40"
                    ariaLabelledBy="reviews-section-title"
                >
                    <ReviewsSection />
                </AppSection>
            )}

            <AppSection
                className="relative text-text-black"
                ariaLabelledBy="faq-section-title"
            >
                <FAQSection />
            </AppSection>

            {articles.length > 0 && (
                <AppSection ariaLabelledBy="articles-section-title">
                    <ArticlesSection articleClass="text-dark-green" />
                </AppSection>
            )}
        </AppLayout>
    );
}

type AppSectionProps = {
    className?: string;
    children: React.ReactNode;
    ariaLabelledBy?: string;
};
function AppSection({ className, children, ariaLabelledBy }: AppSectionProps) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <section
                {...(ariaLabelledBy
                    ? { 'aria-labelledby': ariaLabelledBy }
                    : {})}
                className={cn(
                    'my-11 sm:my-14 md:my-20 lg:my-26 xl:my-40',
                    className,
                )}
            >
                {children}
            </section>
        </ErrorBoundary>
    );
}
