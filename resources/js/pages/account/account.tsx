import TinyMobileBg from '@/assets/images/account/account-bg-mobile-tiny.webp';
import MobileBg from '@/assets/images/account/account-bg-mobile.webp';
import TinyDesktopBg from '@/assets/images/account/account-bg-tiny.webp';
import DesktopBg from '@/assets/images/account/account-bg.webp';
import Padlock from '@/assets/svgs/padlock.svg';
import CategoryFilters from '@/components/account/molecules/category-filters';
import FavoriteList from '@/components/account/organisms/favorite-list';
import BgImage from '@/components/shared/atoms/bg-image';
import DarkBtn from '@/components/user/atoms/dark-btn';
import LazyImage from '@/components/user/atoms/lazy-image';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import SlideLayout from '@/components/user/molecules/slide-layout';
import ArticlesSection from '@/components/user/organisms/articles-section';
import useToggle from '@/hooks/use-toggle';
import AppLayout from '@/layouts/user/app-layout';
import { menuItems } from '@/lib/data/account-menu-items';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { Article, Tier } from '@/types/model';
import { Link, usePage } from '@inertiajs/react';

type PurchaseType = {
    id: number;
    expires: string;
    expiring_soon: boolean;
};

export default function Account() {
    const { auth, tiers, purchased, articles } = usePage<{
        tiers: Tier[];
        auth: Auth;
        purchased: PurchaseType[];
        articles: Article[];
    }>().props;

    const isAdmin =
        auth.roles.includes('admin') || auth.roles.includes('editor');

    const [showMenu, toggleMenu] = useToggle(false);

    return (
        <AppLayout
            variant="account"
            layoutClass="text-white bg-dark-swamp"
            pageClass="px-4 pb-27 sm:pb-34 lg:pb-40 xl:pb-75 sm:px-11 2xl:px-25 3xl:px-40"
        >
            <BgImage
                desktopPath={DesktopBg}
                desktopTinyPath={TinyDesktopBg}
                mobilePath={MobileBg}
                mobileTinyPath={TinyMobileBg}
                pictureClass="size-full object-cover object-center"
                imageClass="size-full object-cover object-left-top"
            />

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
                                isAdmin={isAdmin}
                                className={cn(
                                    idx === 0 &&
                                        'account-card-b pt-28 xl:flex-col xl:justify-center xl:text-center',
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

                    {articles.length > 0 && (
                        <div className="mt-15 rounded-4xl border-2 border-white/20 bg-card-backdrop-gray/50 px-8 pt-12 backdrop-blur-sm md:mt-20 md:px-10 xl:mt-30">
                            <ArticlesSection
                                articleClass="text-white"
                                titleClass="text-4xl sm:text-5xl text-white"
                                subtitleClass="text-white"
                            />
                        </div>
                    )}
                </section>
            </div>
            <SlideLayout
                onClose={() => toggleMenu(false)}
                show={showMenu}
                className="lg:hidden"
            >
                <CategoryFilters
                    key="mobile-category-filters"
                    items={menuItems}
                    propName="favorites"
                    onClose={() => toggleMenu(false)}
                    className="rounded-l-none bg-light-swamp/80 text-white"
                />
            </SlideLayout>
        </AppLayout>
    );
}

type TierCardProps = {
    tier: Tier;
    className?: string;
    purchased: PurchaseType | undefined;
    isAdmin?: boolean;
};

function TierCard({
    isAdmin = false,
    tier,
    className,
    purchased,
}: TierCardProps) {
    const hasAccess = purchased != null || isAdmin;

    return (
        <li
            className={cn(
                'relative max-w-85 rounded-[3rem] border-2 border-white/20 bg-card-backdrop-gray/50 px-9 pt-22 pb-8 text-center backdrop-blur-sm sm:flex sm:max-w-182 sm:items-center sm:gap-4 sm:px-6 sm:py-11 sm:text-left md:px-8 xl:max-w-full xl:px-10',
                className,
                !hasAccess && 'grayscale-75',
            )}
        >
            <Link
                href={
                    hasAccess
                        ? route(tier.route + '.index')
                        : route('tiers.index')
                }
                as="button"
                className="absolute inset-0 z-10 cursor-pointer"
            ></Link>

            {!hasAccess && (
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
