import Rate1 from '@/assets/images/home/rate-1.webp';
import Rate2 from '@/assets/images/home/rate-2.webp';
import Rate3 from '@/assets/images/home/rate-3.webp';
import { v4 as uuidv4 } from 'uuid';
import PrimaryBtn from '../atoms/primary-btn';
import RateCard from '../atoms/rate-card';
import SpanHighlight from '../atoms/span-highlight';

export default function RatesSection() {
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
                {rateCards.map((card) => (
                    <RateCard
                        key={card.id}
                        image={card.img}
                        alt={card.alt}
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

type RateCard = {
    id: string;
    img: string;
    alt: string;
    title: string;
    description: string;
    price: number;
};

const rateCards: RateCard[] = [
    {
        id: uuidv4(),
        img: Rate1,
        alt: 'Открытые двери с видом на небо и море — метафора новых возможностей и свободы выбора',
        title: 'Точка входа',
        description:
            'Доступ к одному любому разделу на ваш выбор: Душа, Тело или Питание. Идеально, если хотите начать с конкретного фокуса и протестировать платформу → минимальный шаг, максимум пользы',
        price: 2990,
    },
    {
        id: uuidv4(),
        img: Rate2,
        alt: 'Рука складывает камни в японском саду на фоне кругов на песке — символ баланса и сосредоточенности',
        title: 'Баланс',
        description:
            'Выбирайте любые два раздела и получайте больше пользы и знаний. Подходит, если вам важна связка, например: питание + движение или тело + эмоции → как комбо-набор заботы о себе',
        price: 5980,
    },
    {
        id: uuidv4(),
        img: Rate3,
        alt: 'Женщина на рассвете в лесу с распростёртыми руками — символ внутренней гармонии и пробуждения',
        title: 'Целостность',
        description:
            'Полный доступ ко всем трём разделам. Получайте максимум: все материалы, программы, рекомендации и поддержка в одном потоке → цельная система, которая работает на всех уровнях',
        price: 8970,
    },
];
