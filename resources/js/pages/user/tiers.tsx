import Hero1 from "@/assets/images/tier/soul.webp";
import TinyHero1 from "@/assets/images/home/hero-1-tiny.webp";
import Hero2 from "@/assets/images/tier/food.webp";
import TinyHero2 from "@/assets/images/home/hero-2-tiny.webp";
import Hero3 from "@/assets/images/home/hero-3.webp";
import TinyHero3 from "@/assets/images/tier/sport.webp";
import TierBg1 from "@/assets/images/tier/tier-bg-1.webp";
import TierBgTiny1 from "@/assets/images/tier/tier-bg-tiny1.webp";
import TierBg2 from "@/assets/images/tier/tier-bg-2.webp";
import TierBgTiny2 from "@/assets/images/tier/tier-bg-tiny-2.webp"
import SpanHighlight from "@/components/user/atoms/span-highlight";
import UserLayout from "@/layouts/user/user-layout";
import LazyImage from "@/components/user/atoms/lazy-image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CheckoutDisplay from "@/components/user/organisms/checkout-display";

export default function Tiers() {
    const [isCart, setCartPage] = useState(true);

    function handlePaymentClick() {
        setCartPage(false);
    }

    return (
        <UserLayout
            layoutClass="text-white relative bg-main-page-bg"
            pageClass="px-3 pb-25 sm:px-6.5 md:pb-23 xl:pb-33.5 2xl:px-25 2xl:pb-40 3xl:px-45"
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

            <h1 className="my-13 -mx-3 sm:mx-0 sm:my-20 lg:my-25 z-20 relative">
                <SpanHighlight
                    text='Выберите разделы,'
                    className="text-white text-[4rem] sm:text-[6rem] lg:text-[8rem] mx-auto mt-[0.1em]"
                />
                <span
                    className="font-heading text-center block py-1 px-3 bg-gray-text-bg w-max mx-auto mt-2 text-xl md:text-4xl md:mt-4 lx:mt-5 xl:text-5xl">
                    к которым хотите получить доступ
                </span>
            </h1>

            <div className="flex flex-col items-center gap-13 mt-26 sm:mt-16 xl:flex-row xl:items-start z-20 relative">
                <ul className="space-y-24 sm:space-y-6 mx-auto">
                    {sections.map((section, idx) => (
                        <li key={section.id}>
                            <TierCard tier={section} className={cn(idx !== 1 ? "pt-28" : "sm:gap-10")} />
                        </li>
                    ))}
                </ul>

                <CheckoutDisplay
                    onPaymentClick={handlePaymentClick}
                    className="shrink-0 xl:w-110 2xl:w-135"
                />
            </div>

        </UserLayout>
    )
}

type TierCardProps = {
    tier: Section;
    className?: string;
}

function TierCard({ tier, className }: TierCardProps) {

    return (
        <article
            className={cn("rounded-[3rem] border-2 border-white/20 relative max-w-85 backdrop-blur-sm bg-card-backdrop-gray/50 pt-22 px-9 pb-8 sm:flex sm:gap-4 sm:py-11 sm:px-6 sm:items-center sm:max-w-182 md:px-8 xl:px-10 xl:max-w-full", className)}>

            <LazyImage
                img={tier.img}
                tinyImg={tier.tinyImage}
                alt={tier.altText}
                parentClass="absolute -top-24 left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 w-48 mb-4 sm:w-60 sm:shrink-0 sm:mx-0"
                imgClass="object-contain"
            />

            <div className="">
                <header>
                    <h2
                        className="font-heading text-4xl text-center sm:text-left mb-4 sm:text-5xl lg:text-6xl md:mb-7"
                    >
                        {tier.title}
                    </h2>
                </header>

                <p
                    className="text-sm text-center text-balance sm:text-left sm:text-base 2xl:text-lg mb-5 md:mb-8"
                >
                    {tier.description}
                </p>

            </div>
        </article>
    )
}

type AmbientBackdropProps = {
    shouldFade: boolean;
    img: string;
    tinyImg: string;
}

function AmbientBackdrop({ shouldFade, img, tinyImg }: AmbientBackdropProps) {
    return (<div
        aria-hidden="true"
        className={cn("absolute pointer-events-none inset-0 transition-opacity duration-1000 ease-in-out", shouldFade && "opacity-0")}
    >
        <LazyImage
            img={img}
            tinyImg={tinyImg}
            alt=""
            parentClass="size-full"
            imgClass="object-right"
        />

        <div className="bg-fade-olive-theme absolute inset-0 opacity-50"></div>
    </div>)
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
        title: "Душа",
        description:
            "Если вы часто испытываете стресс, сталкиваетесь с проблемами со сном, ваши мысли постоянно кружатся в голове, и вы чувствуете нервозность и беспокойство, ищите душевный баланс — этот раздел создан для вас.",
        img: Hero1,
        tinyImage: TinyHero1,
        altText:
            "Девушка в позе лотоса медитирует, сидя на полу в зелёной спортивной одежде",
    },
    {
        id: 2,
        title: "Питание",
        description:
            "Если вы сталкиваетесь с избыточным весом, проблемами ЖКТ и общими сложностями со здоровьем, нутрициолог предложил вам план питания, но рецептов недостаточно и их сложно организовать, и вы ищете идеи для здоровых и питательных блюд — этот раздел для вас.",
        img: Hero2,
        tinyImage: TinyHero2,
        altText:
            "Зелёная миска, наполненная свежим овощным салатом с помидорами, огурцами и зеленью",
    },
    {
        id: 3,
        title: "Тело",
        description:
            "Если у вас нет времени на поддержание физической активности, но вы хотите поддерживать свое тело в хорошей форме, испытываете одышку при активности, плохое самочувствие без особых причин, страдаете от избыточного веса и ощущения скованности и прочего — этот раздел создан для вас.",
        img: Hero3,
        tinyImage: TinyHero3,
        altText: "Пара зелёных гантелей для фитнеса",
    },
];

