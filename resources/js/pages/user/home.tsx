import UserLayout from "@/layouts/user/user-layout";
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
import BackgroundHome from "@/components/user/atoms/background-home";
import ArtLayer from "@/components/user/atoms/art-layer";
import CarrotTop from "@/assets/images/home/veggies/top-carrot.webp";
import CarrotMiddle from "@/assets/images/home/veggies/middle-carrot.webp";
import CarrotBottom from "@/assets/images/home/veggies/bottom-carrot.webp";
import CutChili from "@/assets/images/home/veggies/cut-chilli.webp";
import Laurel from "@/assets/images/home/veggies/laurel.webp";
import Avocado from "@/assets/images/home/veggies/avocado.webp";
import Tomatoes from "@/assets/images/home/veggies/tomatoes.webp";
import BellPepper from "@/assets/images/home/veggies/bell-pepper.webp";
import BerryLeaves from "@/assets/images/home/veggies/berry-leaves.webp";
import TopWholeChilli from "@/assets/images/home/veggies/top-whole-chilli.webp";
import BottomWholeChilli from "@/assets/images/home/veggies/bottom-whole-chilli.webp";
import MiddleWholeChilli from "@/assets/images/home/veggies/middle-whole-chilli.webp";
import CutBellPepper from "@/assets/images/home/veggies/cut-bell-pepper.webp";
import BottomRadish from "@/assets/images/home/veggies/bottom-radish.webp";
import MiddleRadish from "@/assets/images/home/veggies/middle-radish.webp";
import RightRadish from "@/assets/images/home/veggies/right-radish.webp";

export default function Home() {
    return (
        <UserLayout layoutClass="text-text-black bg-main-page-bg" pageClass="px-4 sm:px-11 2xl:px-25 3xl:px-40 overflow-visible">

            <BackgroundHome />

            <AppSection className="text-white">
                <HeroSection />
            </AppSection>

            <AppSection className="text-white relative" ariaLabelledBy="intro-heading">
                <IntroSection />

                <ArtLayer img={CarrotTop} className="-left-10 bottom-80 w-3/5 max-w-100" />
                <ArtLayer img={CarrotMiddle} className="-left-20 bottom-30 sm:bottom-30 md:bottom-20 w-3/5 max-w-120" />
                <ArtLayer img={CarrotBottom} className="right-0 -bottom-30 w-62 sm:right-auto sm:left-0 lg:w-80 lg:-bottom-50" />
            </AppSection>

            <AppSection className="text-text-black relative" ariaLabelledBy="nutrition-section-title">
                <FoodSection />

                <ArtLayer img={CutChili} className="-right-10 z-10 top-50 min-w-60 sm:top-10 xl:-top-50 xl:-right-20 2xl:-right-40 w-3/5 max-w-105" />
                <ArtLayer img={Tomatoes} className="hidden w-100 right-5 xl:block xl:bottom-40" />
                <ArtLayer img={BerryLeaves} className="max-w-140 w-full top-1/4 -right-1/3 sm:top-1/2 lg:-bottom-80 lg:top-auto lg:right-auto lg:-left-20" />
            </AppSection>

            <AppSection className="text-text-black" ariaLabelledBy="soul-section-title">
                <SoulSection />
            </AppSection>

            <AppSection className="text-text-black relative" ariaLabelledBy="body-section-title">
                <BodySection />

                <ArtLayer img={Avocado} className="left-3/5 -translate-x-1/2 w-5/3 max-w-220 bottom-1/4 md:w-full md:bottom-60 2xl:-bottom-50" />
            </AppSection>

            <AppSection className="text-text-black relative">
                <RatesSection />

                <ArtLayer img={Tomatoes} className=" w-1/2 max-w-75 right-0 xl:hidden bottom-20 md:right-auto md:left-0 md:bottom-1/2" />
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
