import Padlock from '@/assets/svgs/padlock.svg';
import AccountBackground from '@/components/account/atoms/account-background';
import FavoriteMenu from '@/components/account/molecules/favorite-menu';
import FavoriteList from '@/components/account/organisms/favorite-list';
import DarkBtn from '@/components/user/atoms/dark-btn';
import LazyImage from '@/components/user/atoms/lazy-image';
import PrimaryBtn from '@/components/user/atoms/primary-btn';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import SlideLayout from '@/components/user/molecules/slide-layout';
import ArticlesSection from '@/components/user/organisms/home/articles-section';
import useToggle from '@/hooks/use-toggle';
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

    const [showMenu, toggleMenu] = useToggle(false);

    return (
        <AccountLayout
            layoutClass="text-white bg-main-page-bg"
            pageClass="px-4 pb-27 sm:pb-34 lg:pb-40 xl:pb-75 sm:px-11 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <AccountBackground />

            <h1
                className={cn(
                    'relative z-20 -mx-3 mt-15 mb-5 block sm:mt-25 sm:mb-25 lg:mt-30 lg:mb-30',
                )}
            >
                <SpanHighlight
                    text="Личный кабинет"
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                />
                <span
                    className={cn(
                        'mx-auto mt-2 block w-fit overflow-hidden px-3 text-center font-heading text-xl sm:mt-5 sm:text-3xl md:text-4xl xl:text-5xl',
                    )}
                >
                    {auth.user.name}, рады видеть вас на нашем сайте!
                </span>
            </h1>

            <div className="space-y-17 sm:space-y-24 xl:space-y-30">
                <section className="pt-1">
                    <ul
                        className={cn(
                            'account-card-parent mx-auto mt-30 w-fit space-y-24 sm:mt-8 sm:space-y-6 xl:w-full xl:grid-rows-2 xl:space-y-0',
                        )}
                    >
                        {tiers.map((tier, idx) => (
                            <TierCard
                                key={tier.id}
                                tier={tier}
                                purchased={purchased.find(
                                    (t) => t.id === tier.id,
                                )}
                                className={cn(
                                    idx === 0 &&
                                        'account-card-b pt-28 xl:flex-col xl:text-center',
                                    idx === 1 && 'account-card-a sm:gap-10',
                                    idx === 2 && 'account-card-c pt-28',
                                )}
                            />
                        ))}
                    </ul>

                    <DarkBtn
                        href={route('tiers.index')}
                        className="mx-auto my-15 border border-white px-[2em] text-sm md:my-20 md:text-base xl:my-30 xl:text-lg"
                    >
                        Продлить | Изменить подписку
                    </DarkBtn>
                </section>

                <section>
                    <SpanHighlight
                        text="Избранное"
                        className="mx-auto mt-[0.1em] mb-15 text-[5rem] text-white sm:text-[6rem] md:mb-20 lg:text-[8rem] xl:mb-25"
                    />
                    <DarkBtn
                        onClick={() => toggleMenu(true)}
                        className="mx-auto my-15 px-[2em] text-sm md:my-20 md:text-base lg:hidden"
                    >
                        Фильтры
                    </DarkBtn>

                    <FavoriteList />

                    <div className="mt-15 rounded-4xl border-2 border-white/20 bg-card-backdrop-gray/50 px-8 pt-12 backdrop-blur-sm md:mt-20 md:px-10 xl:mt-30">
                        <ArticlesSection
                            articleClass="text-white"
                            titleClass="text-4xl sm:text-5xl text-white"
                            subtitleClass="text-white"
                        />
                    </div>
                </section>
            </div>
            <SlideLayout
                onClose={() => toggleMenu(false)}
                show={showMenu}
                className="lg:hidden"
            >
                <FavoriteMenu
                    onClose={() => toggleMenu(false)}
                    className="rounded-l-none bg-light-swamp/80 text-white"
                />
            </SlideLayout>
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
