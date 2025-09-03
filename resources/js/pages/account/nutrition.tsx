import TinyMobileBg from '@/assets/images/food/food-bg-tablet-tiny.webp';
import MobileBg from '@/assets/images/food/food-bg-tablet.webp';
import TinyDesktopBg from '@/assets/images/food/food-bg-desktop-tiny.webp';
import DesktopBg from '@/assets/images/food/food-bg-desktop.webp';
import LinkCard from '@/components/account/atoms/link-card';
import BgImage from '@/components/shared/atoms/bg-image';
import FAQSection from '@/components/shared/organisms/faq-section';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { nutritionCardData } from '@/lib/data/card-data';
import { cn } from '@/lib/utils';

export default function Nutrition() {
    return (
        <AppLayout
            variant="tier"
            layoutClass="text-white bg-light-sand"
            pageClass="px-4 pb-20 space-y-21 sm:space-y-35 md:space-y-28 xl:space-y-34 sm:pb-24 xl:pb-30 sm:px-11 2xl:px-25 3xl:px-40"
        >
            <BgImage
                desktopPath={DesktopBg}
                desktopTinyPath={TinyDesktopBg}
                mobilePath={MobileBg}
                mobileTinyPath={TinyMobileBg}
            />

            <section>
                <h1
                    className={cn(
                        'relative z-20 -mx-3 mt-15 mb-5 block sm:mt-25 sm:mb-25 lg:mt-30 lg:mb-30',
                    )}
                >
                    <SpanHighlight
                        text="Раздел питание"
                        className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                    />
                    <span
                        className={cn(
                            'mx-auto mt-5 block w-fit max-w-190 overflow-hidden px-3 text-center font-heading text-sm text-balance text-text-black sm:mt-8 sm:text-xl md:mt-10',
                        )}
                    >
                        Поздравляем с важным шагом к здоровью и гармонии! Вы
                        сделали правильный выбор, оформив подписку на раздел
                        "Питание" — это первый шаг к новой, яркой жизни.
                        Помните, что каждый маленький шаг ведет к большим
                        переменам. Ваша решимость и желание заботиться о себе —
                        уже победа! Пусть этот путь станет для вас вдохновением
                        и источником энергии. Не бойтесь экспериментировать,
                        слушайте свое тело и наслаждайтесь процессом. Ваша
                        забота о здоровье — это инвестиция в будущее. Вперёд к
                        новым достижениям и счастливой, здоровой жизни!
                    </span>
                </h1>

                <ul
                    className="relative z-11 mt-40 mb-31 flex flex-wrap justify-center gap-x-5 gap-y-31 sm:gap-y-35"
                    role="list"
                >
                    {nutritionCardData.map((card) => (
                        <LinkCard
                            html={card.text}
                            key={card.id}
                            img={card.img}
                            alt={card.alt}
                            route={card.route}
                        />
                    ))}
                </ul>
            </section>

            <FAQSection />
        </AppLayout>
    );
}
