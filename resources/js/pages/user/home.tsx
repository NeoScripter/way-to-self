import UserLayout from "@/layouts/user/user-layout";
import { lazy } from "react";
import HeroSection from "@/components/user/organisms/home/hero-section";
import IntroSection from "@/components/user/organisms/home/intro-section";
import FoodSection from "@/components/user/organisms/home/food-section";
const BackgroundHome = lazy(() => import('@/components/user/atoms/background-home'));

export default function Home() {
    return (
        <UserLayout layoutClass="text-text-black bg-main-page-bg" pageClass="px-4 sm:px-11 2xl:px-25 3xl:px-40 overflow-visible">

            <BackgroundHome />

            <section className="my-11 sm:my-14 md:my-20 lg:my-26 xl:my-40 text-white">
                <HeroSection />
            </section>

            <section aria-labelledby="intro-heading" className="my-11 sm:my-14 md:my-20 lg:my-26 xl:my-40 text-white">
                <IntroSection />
            </section>

            <section aria-labelledby="nutrition-section-title" className="my-11 sm:my-14 md:my-20 lg:my-26 xl:my-40 text-text-black">
                <FoodSection />
            </section>


        </UserLayout>
    )
}
