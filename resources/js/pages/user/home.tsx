import UserLayout from "@/layouts/user/user-layout";
import { lazy } from "react";
import HeroSection from "@/components/user/organisms/home/hero-section";
import IntroSection from "@/components/user/organisms/home/intro-section";
import FoodSection from "@/components/user/organisms/home/food-section";
import SoulSection from "@/components/user/organisms/home/soul-section";
import BodySection from "@/components/user/organisms/home/body-section";
import { cn } from "@/lib/utils";
import RatesSection from "@/components/user/organisms/home/rates-section";
import ReviewsSection from "@/components/user/organisms/home/reviews-section";
import FAQSection from "@/components/user/organisms/shared/faq-section";
import ArticlesSection from "@/components/user/organisms/home/articles-section";
const BackgroundHome = lazy(() => import('@/components/user/atoms/background-home'));

export default function Home() {
    return (
        <UserLayout layoutClass="text-text-black bg-main-page-bg" pageClass="px-4 sm:px-11 2xl:px-25 3xl:px-40 overflow-visible">

            <BackgroundHome />

            <AppSection className="text-white">
                <HeroSection />
            </AppSection>

            <AppSection className="text-white" ariaLabelledBy="intro-heading">
                <IntroSection />
            </AppSection>

            <AppSection className="text-text-black" ariaLabelledBy="nutrition-section-title">
                <FoodSection />
            </AppSection>

            <AppSection className="text-text-black" ariaLabelledBy="soul-section-title">
                <SoulSection />
            </AppSection>

            <AppSection className="text-text-black" ariaLabelledBy="body-section-title">
                <BodySection />
            </AppSection>

            <AppSection className="text-text-black">
                <RatesSection />
            </AppSection>

            <AppSection className="text-text-black -mx-4 sm:-mx-11 2xl:-mx-25 3xl:-mx-40">
                <ReviewsSection />
            </AppSection>

            <AppSection className="text-text-black">
                <FAQSection />
            </AppSection>

            <AppSection>
                <ArticlesSection />
            </AppSection>

        </UserLayout>
    )
}

type AppSectionProps = {
    className?: string;
    children: React.ReactNode;
    ariaLabelledBy?: string;
}

function AppSection({ className, children, ariaLabelledBy }: AppSectionProps) {
    return (
        <section
            {...(ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : {})}
            className={cn("my-11 sm:my-14 md:my-20 lg:my-26 xl:my-40", className)}
        >
            {children}
        </section>
    );
}
