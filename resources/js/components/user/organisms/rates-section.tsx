import CutBellPepper from '@/assets/images/home/veggies/cut-bell-pepper.webp';
import MiddleRadish from '@/assets/images/home/veggies/middle-radish.webp';
import RightRadish from '@/assets/images/home/veggies/right-radish.webp';
import Tomatoes from '@/assets/images/home/veggies/tomatoes.webp';
import { Plan } from '@/types/model';
import { usePage } from '@inertiajs/react';
import ArtLayer from '../atoms/art-layer';
import PlanCard from '../atoms/plan-card';
import PrimaryBtn from '../atoms/primary-btn';
import SpanHighlight from '../atoms/span-highlight';

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
                className="relative z-11 mt-30 grid gap-30 place-content-center sm:mt-44 sm:gap-40 xl:grid-cols-[repeat(auto-fit,_31.25rem)] xl:gap-9"
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

            <ArtLayer
                img={Tomatoes}
                className="right-0 bottom-1/3 w-1/2 max-w-75 md:right-auto md:bottom-1/2 md:left-0 xl:hidden"
            />
            <ArtLayer
                img={RightRadish}
                className="top-1/2 -right-30 hidden w-75 md:block xl:hidden"
            />
            <ArtLayer
                img={MiddleRadish}
                className="top-1/2 -right-0 hidden w-50 md:block xl:hidden"
            />
            <ArtLayer
                img={CutBellPepper}
                className="top-1/5 -right-20 w-3/5 max-w-102 sm:top-0 sm:right-auto sm:-left-20 xl:top-auto xl:-bottom-40"
            />
        </>
    );
}
