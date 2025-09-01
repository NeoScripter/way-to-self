import NutritionBackground from '@/components/account/atoms/nutrition-background';
import FAQSection from '@/components/shared/organisms/faq-section';
import InfoCard from '@/components/user/atoms/info-card';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { foodCardData } from '@/lib/data/card-data';
import { cn } from '@/lib/utils';

export default function Nutrition() {
    return (
        <AppLayout
            variant="tier"
            layoutClass="text-white bg-main-page-bg"
            pageClass="px-4 pb-27 space-y-21 sm:space-y-35 md:space-y-28 xl:space-y-34 sm:pb-34 lg:pb-40 xl:pb-75 sm:px-11 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <NutritionBackground />

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
                    className="relative z-11 mb-17 grid gap-11 sm:grid-cols-2 xl:grid-cols-4"
                    role="list"
                >
                    {foodCardData.map((card) => (
                        <InfoCard
                            html={card.text}
                            key={card.id}
                            img={card.img}
                            alt={card.alt}
                        />
                    ))}
                </ul>
            </section>

            <FAQSection />
        </AppLayout>
    );
}
