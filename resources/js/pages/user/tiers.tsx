import TierBgTiny1 from '@/assets/images/tier/tiers-bg-1-tiny.webp';
import TierBg1 from '@/assets/images/tier/tiers-bg-1.webp';
import TierBgTiny2 from '@/assets/images/tier/tiers-bg-2-tiny.webp';
import TierBg2 from '@/assets/images/tier/tiers-bg-2.webp';
import TinyHero2 from '@/assets/images/tier/tiers-food-tiny.webp';
import Hero2 from '@/assets/images/tier/tiers-food.webp';
import TinyHero1 from '@/assets/images/tier/tiers-soul-tiny.webp';
import Hero1 from '@/assets/images/tier/tiers-soul.webp';
import TinyHero3 from '@/assets/images/tier/tiers-sport-tiny.webp';
import Hero3 from '@/assets/images/tier/tiers-sport.webp';
import LazyImage from '@/components/user/atoms/lazy-image';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import TierSignUp from '@/components/user/molecules/tier-sign-up';
import CheckoutDisplay from '@/components/user/organisms/checkout-display';
import UserLayout from '@/layouts/user/user-layout';
import { cn } from '@/lib/utils';
import { Checkbox } from '@headlessui/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Tiers() {
    const [isCart, setCartPage] = useState(true);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [telegram, setTelegram] = useState('');
    const [agreedData, setAgreedData] = useState(false);
    const [agreedPolicy, setAgreedPolicy] = useState(false);

    function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function changeUserName(e: React.ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value);
    }

    function changeTelegram(e: React.ChangeEvent<HTMLInputElement>) {
        setTelegram(e.target.value);
    }

    function handlePaymentClick() {
        setCartPage(false);
    }

    function handleReturnClick() {
        setCartPage(true);
    }

    return (
        <UserLayout
            layoutClass="text-white relative bg-main-page-bg"
            pageClass="px-3 pb-18 sm:px-6.5 md:pb-16 xl:pb-33.5 2xl:px-14 2xl:pb-20 3xl:px-45"
        >
            <AmbientBackdrop
                shouldFade={!isCart}
                img={TierBg1}
                tinyImg={TierBgTiny1}
            />

            <AmbientBackdrop
                shouldFade={isCart}
                img={TierBg2}
                tinyImg={TierBgTiny2}
            />

            <h1
                className={cn(
                    'relative z-20 -mx-3 my-13 sm:mt-20 lg:mt-25',
                    !isCart && 'mb-4 sm:mb-8 lg:mb-10',
                )}
            >
                <SpanHighlight
                    text={cn(
                        isCart ? 'Выберите разделы,' : 'Оформление заказа',
                    )}
                    className="mx-auto mt-[0.1em] text-[3.8rem] text-white sm:text-[6rem] lg:text-[8rem]"
                />
                <span
                    className={cn(
                        'lx:mt-5 mx-auto mt-2 block w-max overflow-hidden bg-gray-text-bg px-3 text-center font-heading text-xl transition-[max-height] duration-1000 ease-in-out md:mt-4 md:text-4xl xl:text-5xl',
                        isCart ? 'max-h-100 py-1' : 'max-h-0',
                    )}
                >
                    к которым хотите получить доступ
                </span>
            </h1>

            <div
                className={cn(
                    'relative z-20 flex flex-col items-center gap-13 xl:flex-row xl:items-start',
                    isCart ? 'mt-26 sm:mt-16' : 'mt-13 sm:mt-8',
                )}
            >
                <div className="relative">
                    <ul
                        className={cn(
                            'mx-auto space-y-24 overflow-y-clip pt-5 transition-all duration-1500 ease-in-out sm:space-y-6',
                            !isCart
                                ? 'pointer-events-none max-h-0 opacity-0'
                                : 'max-h-500',
                        )}
                    >
                        {sections.map((section, idx) => (
                            <li key={section.id}>
                                <TierCard
                                    tier={section}
                                    className={cn(
                                        idx !== 1 ? 'pt-28' : 'sm:gap-10',
                                    )}
                                />
                            </li>
                        ))}
                    </ul>

                    <div
                        className={cn(
                            'overflow-hidden transition-all duration-1500 ease-in-out',
                            isCart
                                ? 'pointer-events-none max-h-0 opacity-0'
                                : 'max-h-500',
                        )}
                    >
                        <TierSignUp
                            email={email}
                            userName={username}
                            telegram={telegram}
                            changeTelegram={changeTelegram}
                            changeEmail={changeEmail}
                            changeName={changeUserName}
                        />
                    </div>
                </div>

                <CheckoutDisplay
                    isCart={isCart}
                    onPaymentClick={handlePaymentClick}
                    className="mt-5 shrink-0 xl:w-110 2xl:w-135"
                />
            </div>

            {!isCart && (
                <div className="mt-15">
                    <button
                        onClick={handleReturnClick}
                        type="button"
                        className="group relative z-20 mx-auto flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 text-center font-medium text-gray-text-bg transition-colors duration-200 ease-in hover:text-white md:text-lg xl:text-xl"
                    >
                        <ArrowLeft className="inline size-4 text-gray-text-bg transition-colors duration-200 ease-in group-hover:text-white lg:size-5" />
                        Назад к выбору тарифа
                    </button>
                </div>
            )}
        </UserLayout>
    );
}

type TierCardProps = {
    tier: Section;
    className?: string;
};

function TierCard({ tier, className }: TierCardProps) {
    const [enabled, setEnabled] = useState(false);

    return (
        <article
            className={cn(
                'relative max-w-85 rounded-[3rem] border-2 border-white/20 bg-card-backdrop-gray/50 px-9 pt-22 pb-8 backdrop-blur-sm transition duration-500 ease-in sm:flex sm:max-w-182 sm:items-center sm:gap-4 sm:px-6 sm:py-11 md:px-8 xl:max-w-full xl:px-10',
                className,
                !enabled && 'grayscale',
            )}
        >
            <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group absolute -top-3 -left-3 block size-12 cursor-pointer rounded-md bg-dark-white ring-5 ring-slate-700/20"
            >
                {/* Checkmark icon */}
                <svg
                    className="stroke-slate-700 opacity-0 group-data-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path
                        transform="translate(0, -1)"
                        d="M3 8L6 11L11 5.5"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Checkbox>

            <LazyImage
                img={tier.img}
                tinyImg={tier.tinyImage}
                alt={tier.altText}
                parentClass="absolute -top-24 left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 w-48 mb-4 sm:w-60 sm:shrink-0 sm:mx-0"
                imgClass="object-contain"
            />

            <div className="">
                <header>
                    <h2 className="mb-4 text-center font-heading text-4xl sm:text-left sm:text-5xl md:mb-7 lg:text-6xl">
                        {tier.title}
                    </h2>
                </header>

                <p className="mb-5 text-center text-sm text-balance sm:text-left sm:text-base md:mb-8 2xl:text-lg">
                    {tier.description}
                </p>
            </div>
        </article>
    );
}

type AmbientBackdropProps = {
    shouldFade: boolean;
    img: string;
    tinyImg: string;
};

function AmbientBackdrop({ shouldFade, img, tinyImg }: AmbientBackdropProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-in-out',
                shouldFade && 'opacity-0',
            )}
        >
            <LazyImage
                img={img}
                tinyImg={tinyImg}
                alt=""
                parentClass="size-full"
                imgClass="object-right"
            />

            <div className="absolute inset-0 bg-fade-olive-theme opacity-50"></div>
        </div>
    );
}

type Section = {
    id: number;
    title: string;
    description: string;
    img: string;
    tinyImage: string;
    altText: string;
};

const sections: Section[] = [
    {
        id: 1,
        title: 'Душа',
        description:
            'Если вы часто испытываете стресс, сталкиваетесь с проблемами со сном, ваши мысли постоянно кружатся в голове, и вы чувствуете нервозность и беспокойство, ищите душевный баланс — этот раздел создан для вас.',
        img: Hero1,
        tinyImage: TinyHero1,
        altText:
            'Девушка в позе лотоса медитирует, сидя на полу в зелёной спортивной одежде',
    },
    {
        id: 2,
        title: 'Питание',
        description:
            'Если вы сталкиваетесь с избыточным весом, проблемами ЖКТ и общими сложностями со здоровьем, нутрициолог предложил вам план питания, но рецептов недостаточно и их сложно организовать, и вы ищете идеи для здоровых и питательных блюд — этот раздел для вас.',
        img: Hero2,
        tinyImage: TinyHero2,
        altText:
            'Зелёная миска, наполненная свежим овощным салатом с помидорами, огурцами и зеленью',
    },
    {
        id: 3,
        title: 'Тело',
        description:
            'Если у вас нет времени на поддержание физической активности, но вы хотите поддерживать свое тело в хорошей форме, испытываете одышку при активности, плохое самочувствие без особых причин, страдаете от избыточного веса и ощущения скованности и прочего — этот раздел создан для вас.',
        img: Hero3,
        tinyImage: TinyHero3,
        altText: 'Пара зелёных гантелей для фитнеса',
    },
];
