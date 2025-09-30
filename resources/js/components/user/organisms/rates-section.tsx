import Rate1 from '@/assets/images/home/rate-1.webp';
import Rate2 from '@/assets/images/home/rate-2.webp';
import Rate3 from '@/assets/images/home/rate-3.webp';
import { v4 as uuidv4 } from 'uuid';
import PrimaryBtn from '../atoms/primary-btn';
import SpanHighlight from '../atoms/span-highlight';
import { Plan } from '@/types/model';
import { usePage } from '@inertiajs/react';
import PlanCard from '../atoms/plan-card';

export default function RatesSection() {
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <>
            <h3
                id="rates-section-title"
                className="mb-11 xl:mb-14"
            >
                <SpanHighlight
                    text="Тарифы"
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[8rem]"
                />
            </h3>

            <ul
                className="relative z-11 mt-30 grid gap-30 sm:mt-44 sm:gap-40 xl:grid-cols-3 xl:gap-9"
                role="list"
            >
                {plans.map((card) => (
                    <PlanCard
                        key={card.id}
                        image={card.image}
                        title={card.title}
                        description={card.description}
                        className="mx-auto"
                        price={card.price}
                    />
                ))}
            </ul>

            <p className="relative z-11 mx-auto my-14 block text-center text-sm font-semibold sm:text-base lg:max-w-3/4 2xl:my-17 2xl:text-xl">
                Мы сделали три варианта подписки — чтобы вы могли выбрать тот,
                который подходит именно вам. Хочется начать с малого? Или сразу
                погрузиться в целостный подход? Всё возможно! Главное — начать.
                Вы всегда сможете расширить доступ при необходимости. Подписка
                дает доступ к ресурсу на год с момента оформления.
            </p>

            <PrimaryBtn
                href={route('tiers.index')}
                className="mx-auto 2xl:text-xl"
            >
                Получить доступ
            </PrimaryBtn>
        </>
    );
}
