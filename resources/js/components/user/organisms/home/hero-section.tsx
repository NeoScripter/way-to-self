import SecondaryBtn from "@/components/user/atoms/secondary-btn";
import SpanHighlight from "@/components/user/atoms/span-highlight";
import { PlayIcon } from '@heroicons/react/24/solid'
import Hero1 from "@/assets/images/home/hero-1.webp";
import Hero2 from "@/assets/images/home/hero-2.webp";
import Hero3 from "@/assets/images/home/hero-3.webp";
import HomeCardLayout from "@/components/user/molecules/home-card-layout";

export default function HeroSection() {

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

            <div className="flex items-center flex-wrap gap-4.5 text-sm sm:gap-7.5 sm:text-base xl:gap-9 2xl:text-xl">
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

    const Card1 = () => {
        return (
            <HomeCardLayout
                className="pt-35.5 sm:max-w-171 sm:ml-auto xl:ml-0 xl:max-w-full xl:pt-60"
                ariaDesc="soul-section-description"
                ariaLabel="soul-section-heading">
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

            </HomeCardLayout>)
    }

    const Card2 = () => {
        return (
            <HomeCardLayout
                className="pt-24 sm:px-5 sm:flex sm:justify-between sm:items-center sm:gap-5 md:px-11 md:mr-auto md:py-11 lg:py-14 lg:gap-10 xl:w-3/4 xl:gap-12"
                ariaDesc="food-section-description"
                ariaLabel="food-section-heading">
                <div
                    className="absolute size-57 -top-28 left-1/2 -z-1 -translate-x-1/2 sm:translate-x-0 sm:order-2 sm:w-52 sm:h-auto sm:shrink-0 sm:static md:-order-1 md:w-75"
                    aria-hidden="true"
                >
                    <img
                        src={Hero2}
                        alt="Зелёная миска, наполненная свежим овощным салатом с помидорами, огурцами и зеленью"
                        className="size-full object-center object-contain"
                    />
                </div>

                <div className="md:max-w-full z-5">
                    <header>
                        <h2
                            id="food-section-heading"
                            className="font-heading text-4xl text-center mb-4 md:text-5xl lg:text-6xl md:mb-7"
                        >
                            Питание
                        </h2>
                    </header>

                    <p
                        id="food-section-description"
                        className="text-sm text-center text-balance md:text-base 2xl:text-xl mb-5 md:mb-8"
                    >
                        Если вы сталкиваетесь с избыточным весом, проблемами ЖКТ и общими сложностями со здоровьем, нутрициолог предложил вам план питания, но рецептов недостаточно и их сложно организовать, и вы ищете идеи для здоровых и питательных блюд — этот раздел для вас.
                    </p>

                    <SecondaryBtn
                        className="text-sm mx-auto md:text-base 2xl:text-xl"
                        aria-label="Подробнее о питании"
                    >
                        Подробнее
                    </SecondaryBtn>
                </div>

            </HomeCardLayout>)
    }

    const Card3 = () => {
        return (
            <HomeCardLayout
                className="pt-24 sm:px-5 sm:flex sm:justify-between sm:items-center md:px-11 md:ml-auto md:py-11 lg:py-14 lg:gap-10 xl:w-3/4 xl:gap-12"
                ariaDesc="body-section-description"
                ariaLabel="body-section-heading">
                <div
                    className="absolute w-44 -top-24 left-1/2 -z-1 -translate-x-1/2 sm:translate-x-0 sm:w-52 sm:h-auto sm:shrink-0 sm:static md:order-2 md:w-65 xl:w-75"
                    aria-hidden="true"
                >
                    <img
                        src={Hero3}
                        alt="Пара зелёных гантелей для фитнеса"
                        className="size-full object-center object-contain"
                    />
                </div>

                <div className="md:max-w-full z-5">
                    <header>
                        <h2
                            id="body-section-heading"
                            className="font-heading text-4xl text-center mb-4 md:text-5xl lg:text-6xl md:mb-7"
                        >
                            Тело
                        </h2>
                    </header>

                    <p
                        id="body-section-description"
                        className="text-sm text-center text-balance md:text-base 2xl:text-xl mb-5 md:mb-8"
                    >
                        Если у вас нет времени на поддержание физической активности, но вы хотите поддерживать свое тело в хорошей форме, испытываете одышку при активности, плохое самочувствие без особых причин, страдаете от избыточного веса и ощущения скованности и прочего — этот раздел создан для вас.
                    </p>

                    <SecondaryBtn
                        className="text-sm mx-auto md:text-base 2xl:text-xl"
                        aria-label="Подробнее о питании"
                    >
                        Подробнее
                    </SecondaryBtn>
                </div>

            </HomeCardLayout>)
    }

    return (
        <>
            <div className="flex flex-col gap-30 sm:gap-15 xl:flex-row 2xl:gap-39">
                <Hero />
                <Card1 />
            </div>

            <div className="space-y-30 2xl:space-y-39">
                <Card2 />
                <Card3 />
            </div>
        </>
    )
}
