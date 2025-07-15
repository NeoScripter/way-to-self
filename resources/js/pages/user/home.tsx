import SecondaryBtn from "@/components/user/atoms/secondary-btn";
import SpanHighlight from "@/components/user/atoms/span-highlight";
import UserLayout from "@/layouts/user/user-layout";
import { PlayIcon } from '@heroicons/react/24/solid'
import Hero1 from "@/assets/images/home/hero-1.webp";
import { lazy } from "react";
const BackgroundHome = lazy(() => import('@/components/user/atoms/background-home'));

const Hero = () => (
    <article
        className="max-w-141 2xl:max-w-175"
        aria-labelledby="portal-title"
        aria-describedby="portal-description"
    >
        <header>
            <h1
                id="portal-title"
                className="text-4xl font-heading mb-7 sm:mb-10 sm:text-6xl max-w-73.5 sm:max-w-full 2xl:text-8xl"
            >
                Время вспять
                <br />
                <SpanHighlight
                    text="путь к себе"
                    className="text-[4rem] sm:text-[6rem] ml-auto mt-[0.1em] 2xl:text-[6rem]"
                />
            </h1>
        </header>

        <p
            id="portal-description"
            className="text-sm sm:text-base 2xl:text-xl mb-7 sm:mb-9"
        >
            Портал о том, как улучшить или поддерживать свое здоровье и наслаждаться
            жизнью в полной мере. Ресурс разделен на три ключевых аспекта человеческой
            жизни, которые в совокупности способствуют общему благополучию: Душа, Тело
            и Питание.
        </p>

        <div className="flex items-center flex-wrap gap-4.5 text-sm sm:gap-6.5 sm:text-base 2xl:text-xl">
            <SecondaryBtn className="">Получить доступ</SecondaryBtn>

            <button
                type="button"
                className="flex items-center gap-2 cursor-pointer hover:text-bright-salad transition-colors duration-200 ease-in group"
                aria-label="Смотреть видео о том, как это работает"
            >
                <span
                    className="flex items-center justify-center border-2 group-hover:border-bright-salad transition-colors duration-200 ease-in border-white size-10.5 rounded-full sm:size-12.5"
                    aria-hidden="true"
                >
                    <PlayIcon className="size-6 ml-1 sm:size-7" />
                </span>
                Смотреть как это работает
            </button>
        </div>
    </article>
)

const Card1 = () => (
    <article
        className="rounded-4xl relative backdrop-blur-sm bg-card-backdrop-gray/50 px-9 pb-8 pt-35.5 mb-28 sm:py-11 sm:px-10 lg:px-15.5 lg:py-8.5 2xl:px-17.5 2xl:pb-14 sm:max-w-171 sm:w-full sm:ml-auto xl:ml-0 xl:max-w-full xl:pt-60"
        aria-labelledby="soul-section-heading"
        aria-describedby="soul-section-description"
    >
        <div
            className="absolute size-57 -top-23 left-1/2 -z-1 -translate-x-1/2 sm:translate-x-0 sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:size-70 xl:translate-y-0 xl:-translate-x-1/2 xl:left-1/2 xl:-top-28 xl:size-87"
            aria-hidden="true"
        >
            <img
                src={Hero1}
                alt="Девушка в позе лотоса медитирует, сидя на полу в зелёной спортивной одежде"
                className="size-full object-center object-contain"
            />
        </div>

        <div className="sm:max-w-98.5 sm:ml-auto xl:max-w-full z-5">
            <header>
                <h2
                    id="soul-section-heading"
                    className="font-heading text-4xl text-center mb-4 sm:text-5xl md:text-6xl md:mb-7"
                >
                    Душа
                </h2>
            </header>

            <p
                id="soul-section-description"
                className="text-sm text-center text-balance sm:text-base 2xl:text-xl mb-5 md:mb-8"
            >
                Если вы часто испытываете стресс, сталкиваетесь с проблемами со сном,
                ваши мысли постоянно кружатся в голове, и вы чувствуете нервозность и
                беспокойство, ищите душевный баланс — этот раздел создан для вас.
            </p>

            <SecondaryBtn
                className="text-sm mx-auto sm:text-base 2xl:text-xl"
                aria-label="Подробнее о душевном здоровье"
            >
                Подробнее
            </SecondaryBtn>
        </div>
    </article>

)

export default function Home() {
    return (
        <UserLayout layoutClass="text-text-black bg-main-page-bg" pageClass="px-4 sm:px-11 lg:px-25 2xl:px-40">
            <section className="mt-11 sm:mt-14 md:mt-20 lg:mt-26 xl:mt-40 text-white space-y-26 overflow-visible">

                <BackgroundHome />

                <div className="flex flex-col gap-30 sm:gap-15 xl:flex-row 2xl:gap-39">
                    <Hero />

                    <Card1 />
                </div>
            </section>
        </UserLayout>
    )
}
