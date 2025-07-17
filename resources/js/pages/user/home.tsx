import UserLayout from "@/layouts/user/user-layout";
import { lazy } from "react";
import HeroSection from "@/components/user/organisms/home/hero-section";
import IntroSection from "@/components/user/organisms/home/intro-section";
const BackgroundHome = lazy(() => import('@/components/user/atoms/background-home'));

export default function Home() {
    return (
        <UserLayout layoutClass="text-text-black bg-main-page-bg" pageClass="px-4 sm:px-11 lg:px-25 2xl:px-40 overflow-visible">

            <BackgroundHome />

            <section className="mt-11 sm:mt-14 md:mt-20 lg:mt-26 xl:mt-40 text-white">
                <HeroSection />
            </section>

            <section className="mt-11 sm:mt-14 md:mt-20 lg:mt-26 xl:mt-40 text-white">
                <IntroSection />
            </section>

        </UserLayout>
    )
}
