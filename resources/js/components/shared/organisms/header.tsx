import MenuBg from '@/assets/images/home/home-nav-bg.webp';
import MobileBtnSvg from '@/assets/svgs/mobile-btn.svg';
import DarkBtn from '@/components/user/atoms/dark-btn';
import Logo from '@/components/user/atoms/logo';
import PrimaryBtn from '@/components/user/atoms/primary-btn';
import RedBtn from '@/components/user/atoms/red-btn';
import useToggle from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import {
    ArrowRightStartOnRectangleIcon,
    Cog6ToothIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import { Link, router, usePage } from '@inertiajs/react';
import { Search, XIcon } from 'lucide-react';

type HeaderProps = {
    className?: string;
    variant: string;
};

export default function Header({ className, variant }: HeaderProps) {
    const [show, toggleShow] = useToggle(false);

    return (
        <header
            className={cn(
                'sticky top-0 z-100 flex items-center justify-between gap-x-5 px-7 text-white md:relative md:mx-7 md:px-0 lg:mx-14 xl:mr-23 xl:ml-27 2xl:mr-28 2xl:ml-41',
                className,
                variant === 'guest' && 'border-b border-gray-200',
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    'absolute top-0 bottom-0 left-1/2 -z-10 w-[120vw] -translate-x-1/2 backdrop-blur-lg',
                    className,
                    variant !== 'guest' && 'bg-account-header-bg',
                )}
            ></div>

            <Logo className="mt-2.5 mb-2 ml-1 text-4xl sm:mt-5 sm:mb-4 sm:text-6xl md:mt-7 md:mb-5 md:hidden md:text-4xl lg:block xl:text-6xl" />

            <NavMenu
                variant={variant}
                show={show}
                close={() => toggleShow(false)}
            />

            <MobileBtn
                onClick={() => toggleShow(true)}
                className="mt-2 md:hidden"
                aria-expanded={show}
                aria-controls="mobile-navigation"
            />
        </header>
    );
}

type NavMenuProps = {
    className?: string;
    close: () => void;
    show: boolean;
    variant: string;
};

function NavMenu({ variant, className, close, show }: NavMenuProps) {
    return (
        <div
            className={cn(
                'fixed top-0 right-0 left-0 z-10 h-200 max-h-screen overflow-y-auto bg-light-swamp bg-cover !bg-bottom-left transition-transform duration-500 ease-in-out md:static md:flex md:h-auto md:flex-1 md:items-center md:justify-between md:gap-5 md:overflow-y-visible md:bg-transparent md:!bg-none',
                className,
                show ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
            )}
            id="mobile-navigation"
            style={{ backgroundImage: `url(${MenuBg})` }}
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню"
        >
            <header className="border-b border-gray-100 px-5 py-4 md:hidden">
                <button
                    aria-label="Закрыть меню навигации"
                    onClick={close}
                    className="ml-auto block size-10 cursor-pointer"
                >
                    <XIcon className="size-full text-gray-100" />
                </button>
            </header>
            <Logo className="my-[5vw] text-center text-[18vw] sm:text-8xl md:hidden" />

            <HeaderMenu variant={variant} />
        </div>
    );
}

type NavLinkProps = {
    children: React.ReactNode;
};

function NavLink({ children }: NavLinkProps) {
    return (
        <li className="list-none whitespace-nowrap transition-colors duration-200 ease-in hover:text-very-bright-salad">
            {children}
        </li>
    );
}

type MobileBtnProps = {
    className?: string;
    onClick: () => void;
};

function MobileBtn({ className, onClick }: MobileBtnProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'group relative h-4 w-8 cursor-pointer overflow-clip sm:h-6 sm:w-13',
                className,
            )}
        >
            <span className="shine-element block group-hover:animate-[shine_750ms]"></span>
            <img
                src={MobileBtnSvg}
                alt=""
                className="size-full object-contain object-center"
            />
            <span className="sr-only">Открыть меню навигации</span>
        </button>
    );
}

type HeaderMenuProps = {
    variant: string;
};

function HeaderMenu({ variant }: HeaderMenuProps) {
    const { url, props } = usePage<{
        auth: Auth;
    }>();

    let prefix = 'nutrition';

    if (url.includes('soul')) {
        prefix = 'soul';
    } else if (url.includes('body')) {
        prefix = 'body';
    }

    const user = props.auth.user;
    const isAdmin =
        props.auth.roles.includes('admin') ||
        props.auth.roles.includes('editor');

    function handleScrollDown() {
        close();
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }

    // Common navigation items
    const navItems = [
        {
            label: 'О чем',
            href: route('home'),
            isActive: url === '/',
            showFor: ['guest'],
        },
        {
            label: 'Тарифы',
            href: route('tiers.index'),
            isActive: url === '/tiers',
            showFor: ['guest'],
        },
        {
            label: 'Новости',
            href: route('user.articles.index'),
            isActive: url === '/articles',
            showFor: ['guest'],
        },
        {
            label: 'Питание',
            href: route('nutrition.index'),
            isActive: url.includes('/account/nutrition'),
            showFor: ['tier'],
        },
        {
            label: 'Душа',
            href: route('soul.index'),
            isActive: url.includes('/account/soul'),
            showFor: ['tier'],
        },
        {
            label: 'Тело',
            href: route('body.index'),
            isActive: url.includes('/account/body'),
            showFor: ['tier'],
        },
    ];

    const renderNavLink = (item: (typeof navItems)[0]) => (
        <NavLink key={item.label}>
            <Link
                prefetch
                as="button"
                className={cn(
                    item.isActive
                        ? 'text-bright-salad underline underline-offset-3'
                        : 'cursor-pointer',
                )}
                href={item.href}
            >
                {item.label}
            </Link>
        </NavLink>
    );

    const renderShopLink = () => (
        <NavLink key="shop">
            <RedBtn
                href={route('shop')}
                className="mx-auto py-[0.3rem]"
            >
                Магазин
            </RedBtn>
        </NavLink>
    );

    const renderContactsLink = () => (
        <NavLink key="contacts">
            <button
                className="cursor-pointer"
                onClick={handleScrollDown}
            >
                Контакты
            </button>
        </NavLink>
    );

    const renderHomeLink = () => (
        <NavLink key="home">
            <Link
                href={route('home')}
                className="hidden cursor-pointer md:block lg:hidden"
            >
                Главная
            </Link>
        </NavLink>
    );

    const renderAccountButton = () =>
        user ? (
            <div className="relative mx-auto flex w-fit shrink-0 flex-col items-center gap-12 md:order-2 md:mr-0 md:flex-row md:gap-0">
                <Link
                    href={route(`${prefix}.search`)}
                    as="button"
                    className="flex cursor-pointer items-center gap-7 rounded-full border border-white/75 px-6 py-3 transition-colors duration-200 ease-in hover:bg-white/10 md:border-none"
                >
                    <span className="md:hidden">Поиск по разделу</span>
                    <Search className="size-5 lg:size-6" />
                </Link>
                <DarkBtn
                    className={cn(
                        'flex items-center gap-2 text-xl md:text-sm xl:text-base',
                    )}
                    href={route('account')}
                >
                    <UserIcon className="size-4 shrink-0" />
                    {`${user.name}`}
                </DarkBtn>
            </div>
        ) : (
            <PrimaryBtn
                className={cn(
                    'mx-auto shrink-0 text-xl md:order-2 md:mr-0 md:text-sm xl:text-base',
                )}
                href={route('account')}
            >
                Личный кабинет
            </PrimaryBtn>
        );

    const renderMainNavigation = () => {
        const items = [];

        if (variant !== 'guest') {
            items.push(renderHomeLink());
        }

        // Add filtered nav items
        navItems
            .filter((item) => item.showFor.includes(variant))
            .forEach((item) => items.push(renderNavLink(item)));

        // Add shop and contacts for guest and tier variants
        if (variant === 'guest' || variant === 'tier') {
            items.push(renderShopLink());
            items.push(renderContactsLink());
        }

        // Add shop and contacts for account variant
        if (variant === 'account') {
            items.push(renderShopLink());
            items.push(renderContactsLink());
        }

        return (
            <nav
                aria-label="Основная навигация"
                className={cn(
                    'md:py-6 lg:mx-auto',
                    variant !== 'account' && 'mt-15 mb-50 md:mt-0 md:mb-0',
                )}
            >
                <ul
                    className={cn(
                        'text-center text-xl md:flex md:items-center md:justify-between md:gap-10 md:text-sm lg:gap-10 xl:gap-15 xl:text-base',
                        variant === 'account'
                            ? 'mt-12 space-y-15 md:mt-0 md:space-y-0'
                            : 'space-y-15 md:space-y-0',
                    )}
                >
                    {items}
                </ul>
            </nav>
        );
    };

    const renderAccountActions = () => {
        if (url.endsWith('account/profile')) {
            return (
                <DarkBtn
                    className="mx-auto mt-15 mb-50 shrink-0 text-lg md:mx-0 md:my-0 md:mr-0 md:bg-dark-green md:text-sm md:hover:bg-dark-green/90 lg:text-base"
                    href={route('account')}
                >
                    Личный кабинет
                </DarkBtn>
            );
        }

        return (
            <div className="mt-15 mb-50 shrink-0 space-y-15 text-center text-xl md:my-0 md:flex md:items-center md:gap-7 md:space-y-0 md:text-sm lg:gap-10 xl:text-base">
                {!isAdmin && <NavLink>
                    <Link
                        href={route('account.edit')}
                        as="button"
                        prefetch
                        className="mx-auto flex cursor-pointer items-center gap-2"
                    >
                        <Cog6ToothIcon className="hidden size-6.5 md:block" />
                        Настройки
                    </Link>
                </NavLink>}

                <NavLink>
                    <Link
                        href={route('logout')}
                        onSuccess={() => router.flushAll()}
                        method="post"
                        as="button"
                        className="mx-auto flex cursor-pointer items-center gap-2"
                    >
                        <ArrowRightStartOnRectangleIcon className="hidden size-6.5 md:block" />
                        Выйти
                    </Link>
                </NavLink>
            </div>
        );
    };

    return (
        <>
            {(variant === 'guest' || variant === 'tier') &&
                renderAccountButton()}
            {renderMainNavigation()}
            {variant === 'account' && renderAccountActions()}
        </>
    );
}
