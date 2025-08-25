import Padlock from '@/assets/svgs/padlock.svg';
import AccountBackground from '@/components/account/atoms/account-background';
import FavoriteList from '@/components/account/organisms/favorite-list';
import LazyImage from '@/components/user/atoms/lazy-image';
import PrimaryBtn from '@/components/user/atoms/primary-btn';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import ArticlesSection from '@/components/user/organisms/home/articles-section';
import AccountLayout from '@/layouts/user/account-layout';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { Tier } from '@/types/model';
import { Link, usePage } from '@inertiajs/react';

type PurchaseType = {
    id: number;
    expires: string;
    expiring_soon: boolean;
};

export default function Account() {
    const { auth, tiers, purchased } = usePage<{
        tiers: Tier[];
        auth: Auth;
        purchased: PurchaseType[];
    }>().props;

    return (
        <AccountLayout
            layoutClass="text-white bg-main-page-bg"
            pageClass="px-4 pb-18 sm:px-11 md:pb-16 xl:pb-23.5 2xl:pb-20 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <AccountBackground />

            <h1
                className={cn(
                    'relative z-20 -mx-3 mt-10 mb-4 block sm:mt-20 sm:mb-8 lg:mt-25 lg:mb-10',
                )}
            >
                <SpanHighlight
                    text="Личный кабинет"
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                />
                <span
                    className={cn(
                        'lx:mt-5 mx-auto mt-2 block w-fit overflow-hidden px-3 text-center font-heading text-xl md:mt-4 md:text-4xl xl:text-5xl',
                    )}
                >
                    {auth.user.name}, рады видеть вас на нашем сайте!
                </span>
            </h1>

            <div className="pt-1">
                <ul
                    className={cn(
                        'account-card-parent mx-auto mt-30 w-fit space-y-24 sm:mt-8 sm:space-y-6 xl:w-full xl:grid-rows-2 xl:space-y-0',
                    )}
                >
                    {tiers.map((tier, idx) => (
                        <TierCard
                            key={tier.id}
                            tier={tier}
                            purchased={purchased.find((t) => t.id === tier.id)}
                            className={cn(
                                idx === 0 &&
                                    'account-card-b pt-28 xl:flex-col xl:text-center',
                                idx === 1 && 'account-card-a sm:gap-10',
                                idx === 2 && 'account-card-c pt-28',
                            )}
                        />
                    ))}
                </ul>
            </div>

            <PrimaryBtn
                href={route('tiers.index')}
                className="mx-auto my-15 border border-white px-[2em] text-sm md:my-20 md:text-base xl:text-lg"
            >
                Продлить | Изменить подписку
            </PrimaryBtn>

            <SpanHighlight
                text="Избранное"
                className="mx-auto mt-[0.1em] mb-15 md:mb-20 text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
            />

            <FavoriteList />

            <section className="rounded-4xl mt-15 md:mt-20 border-2 border-white/20 bg-card-backdrop-gray/50 px-8 pt-12 backdrop-blur-sm md:px-10">
                <ArticlesSection
                    articleClass="text-white"
                    titleClass="text-white"
                    subtitleClass="text-white"
                />
            </section>
        </AccountLayout>
    );
}

type TierCardProps = {
    tier: Tier;
    className?: string;
    purchased: PurchaseType | undefined;
};

function TierCard({ tier, className, purchased }: TierCardProps) {
    return (
        <li
            className={cn(
                'relative max-w-85 rounded-[3rem] border-2 border-white/20 bg-card-backdrop-gray/50 px-9 pt-22 pb-8 text-center backdrop-blur-sm sm:flex sm:max-w-182 sm:items-center sm:gap-4 sm:px-6 sm:py-11 sm:text-left md:px-8 xl:max-w-full xl:px-10',
                className,
                !purchased && 'grayscale-75',
            )}
        >
            <Link
                href={!purchased ? route('tiers.index') : route('account')}
                as="button"
                className="absolute inset-0 z-10 cursor-pointer"
            ></Link>

            {!purchased && (
                <div
                    aria-hidden="true"
                    className="absolute -top-8 right-1 z-20 block size-25 sm:-top-6 sm:right-3"
                >
                    <img
                        src={Padlock}
                        alt=""
                        className="size-full object-contain object-center"
                    />
                </div>
            )}

            {tier.image && (
                <LazyImage
                    img={tier.image.path}
                    tinyImg={tier.image.tiny_path}
                    alt={tier.image.alt}
                    parentClass="absolute -top-24 left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 w-48 mb-4 sm:w-60 sm:shrink-0 sm:mx-0"
                    imgClass="object-contain"
                />
            )}

            <div className="">
                <header>
                    <h2 className="mb-4 font-heading text-4xl sm:text-5xl md:mb-7 lg:text-6xl">
                        {tier.name}
                    </h2>
                </header>

                <p className="mb-5 text-sm text-balance sm:text-base 2xl:text-lg">
                    {tier.description}
                </p>

                {purchased && (
                    <p
                        className={cn(
                            'mb-5 text-sm font-bold text-balance underline underline-offset-4 sm:text-base md:mb-8 2xl:text-lg',
                            purchased.expiring_soon
                                ? 'text-red-400'
                                : 'text-very-bright-salad',
                        )}
                    >
                        Подписка на раздел оплачена до {purchased.expires}
                    </p>
                )}
            </div>
        </li>
    );
}
