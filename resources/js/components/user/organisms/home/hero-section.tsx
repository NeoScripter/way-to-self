import TinyHero2 from '@/assets/images/home/home-food-tiny.webp';
import Hero2 from '@/assets/images/home/home-food.webp';
import TinyHero1 from '@/assets/images/home/home-soul-tiny.webp';
import Hero1 from '@/assets/images/home/home-soul.webp';
import TinyHero3 from '@/assets/images/home/home-sport-tiny.webp';
import Hero3 from '@/assets/images/home/home-sport.webp';
import SecondaryBtn from '@/components/user/atoms/secondary-btn';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import HomeCardLayout from '@/components/user/molecules/home-card-layout';
import scrollTo from '@/lib/helpers/scrollTo';
import { PlayIcon } from '@heroicons/react/24/solid';
import LazyImage from '../../atoms/lazy-image';

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
                    className="mb-7 max-w-73.5 font-heading text-4xl sm:mb-10 sm:max-w-full sm:text-6xl 2xl:text-8xl"
                >
                    Время вспять
                    <br />
                    <SpanHighlight
                        text="путь к себе"
                        className="mt-[0.1em] ml-auto text-[4rem] sm:text-[6rem] 2xl:text-[6rem]"
                    />
                </h1>
            </header>

            <p
                id="portal-description"
                className="mb-7 text-sm sm:mb-9 sm:text-base 2xl:text-xl"
            >
                Портал о том, как улучшить или поддерживать свое здоровье и
                наслаждаться жизнью в полной мере. Ресурс разделен на три
                ключевых аспекта человеческой жизни, которые в совокупности
                способствуют общему благополучию: Душа, Тело и Питание.
            </p>

            <div className="flex flex-wrap items-center gap-4.5 text-sm sm:gap-7.5 sm:text-base xl:gap-9 2xl:text-xl">
                <SecondaryBtn href={route('tiers.index')}>
                    Получить доступ
                </SecondaryBtn>

                <button
                    type="button"
                    className="group flex cursor-pointer items-center gap-2 transition-colors duration-200 ease-in hover:text-bright-salad"
                    aria-label="Смотреть видео о том, как это работает"
                >
                    <span
                        className="flex size-10.5 items-center justify-center rounded-full border-2 border-white transition-colors duration-200 ease-in group-hover:border-bright-salad sm:size-12.5"
                        aria-hidden="true"
                    >
                        <PlayIcon className="ml-1 size-6 sm:size-7" />
                    </span>
                    Смотреть как это работает
                </button>
            </div>
        </article>
    );

    const Card1 = () => {
        return (
            <HomeCardLayout
                className="pt-35.5 sm:ml-auto sm:max-w-171 xl:ml-0 xl:max-w-full xl:pt-60"
                ariaDesc="soul-section-description"
                ariaLabel="soul-section-heading"
            >
                <LazyImage
                    img={Hero1}
                    tinyImg={TinyHero1}
                    alt="Девушка в позе лотоса медитирует, сидя на полу в зелёной спортивной одежде"
                    parentClass="absolute size-57 -top-23 left-1/2 -z-1 -translate-x-1/2 sm:translate-x-0 sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:size-70 xl:translate-y-0 xl:-translate-x-1/2 xl:left-1/2 xl:-top-28 xl:size-87"
                />

                <div className="z-5 sm:ml-auto sm:max-w-98.5 xl:max-w-full">
                    <header>
                        <h2
                            id="soul-section-heading"
                            className="mb-4 text-center font-heading text-4xl sm:text-5xl md:mb-7 md:text-6xl"
                        >
                            Душа
                        </h2>
                    </header>

                    <p
                        id="soul-section-description"
                        className="mb-5 text-center text-sm text-balance sm:text-base md:mb-8 2xl:text-xl"
                    >
                        Если вы часто испытываете стресс, сталкиваетесь с
                        проблемами со сном, ваши мысли постоянно кружатся в
                        голове, и вы чувствуете нервозность и беспокойство,
                        ищите душевный баланс — этот раздел создан для вас.
                    </p>

                    <SecondaryBtn
                        onClick={() => scrollTo('#soul-section-title')}
                        className="mx-auto text-sm sm:text-base 2xl:text-xl"
                        aria-label="Подробнее о душевном здоровье"
                    >
                        Подробнее
                    </SecondaryBtn>
                </div>
            </HomeCardLayout>
        );
    };

    const Card2 = () => {
        return (
            <HomeCardLayout
                className="pt-24 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:px-5 md:mr-auto md:px-11 md:py-11 lg:gap-10 lg:py-14 xl:w-3/4 xl:gap-12"
                ariaDesc="food-section-description"
                ariaLabel="food-section-heading"
            >
                <LazyImage
                    img={Hero2}
                    tinyImg={TinyHero2}
                    alt="Зелёная миска, наполненная свежим овощным салатом с помидорами, огурцами и зеленью"
                    parentClass="absolute size-57 -top-28 left-1/2 -z-1 -translate-x-1/2 sm:translate-x-0 sm:order-2 sm:w-52 sm:h-auto sm:shrink-0 sm:static md:-order-1 md:w-75"
                />

                <div className="z-5 md:max-w-full">
                    <header>
                        <h2
                            id="food-section-heading"
                            className="mb-4 text-center font-heading text-4xl md:mb-7 md:text-5xl lg:text-6xl"
                        >
                            Питание
                        </h2>
                    </header>

                    <p
                        id="food-section-description"
                        className="mb-5 text-center text-sm text-balance md:mb-8 md:text-base 2xl:text-xl"
                    >
                        Если вы сталкиваетесь с избыточным весом, проблемами ЖКТ
                        и общими сложностями со здоровьем, нутрициолог предложил
                        вам план питания, но рецептов недостаточно и их сложно
                        организовать, и вы ищете идеи для здоровых и питательных
                        блюд — этот раздел для вас.
                    </p>

                    <SecondaryBtn
                        onClick={() => scrollTo('#nutrition-section-title')}
                        className="mx-auto text-sm sm:text-base 2xl:text-xl"
                        aria-label="Подробнее о питании"
                    >
                        Подробнее
                    </SecondaryBtn>
                </div>
            </HomeCardLayout>
        );
    };

    const Card3 = () => {
        return (
            <HomeCardLayout
                className="mb-0 pt-24 sm:flex sm:items-center sm:justify-between sm:px-5 md:ml-auto md:px-11 md:py-11 lg:gap-10 lg:py-14 xl:w-3/4 xl:gap-12"
                ariaDesc="body-section-description"
                ariaLabel="body-section-heading"
            >
                <LazyImage
                    img={Hero3}
                    tinyImg={TinyHero3}
                    alt="Пара зелёных гантелей для фитнеса"
                    parentClass="absolute w-44 -top-24 left-1/2 -z-1 -translate-x-1/2 sm:translate-x-0 sm:w-52 sm:h-auto sm:shrink-0 sm:static md:order-2 md:w-65 xl:w-75"
                />

                <div className="z-5 md:max-w-full">
                    <header>
                        <h2
                            id="body-section-heading"
                            className="mb-4 text-center font-heading text-4xl md:mb-7 md:text-5xl lg:text-6xl"
                        >
                            Тело
                        </h2>
                    </header>

                    <p
                        id="body-section-description"
                        className="mb-5 text-center text-sm text-balance md:mb-8 md:text-base 2xl:text-xl"
                    >
                        Если у вас нет времени на поддержание физической
                        активности, но вы хотите поддерживать свое тело в
                        хорошей форме, испытываете одышку при активности, плохое
                        самочувствие без особых причин, страдаете от избыточного
                        веса и ощущения скованности и прочего — этот раздел
                        создан для вас.
                    </p>

                    <SecondaryBtn
                        onClick={() => scrollTo('#body-section-title')}
                        className="mx-auto text-sm sm:text-base 2xl:text-xl"
                        aria-label="Подробнее о разделе тело"
                    >
                        Подробнее
                    </SecondaryBtn>
                </div>
            </HomeCardLayout>
        );
    };

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
    );
}
