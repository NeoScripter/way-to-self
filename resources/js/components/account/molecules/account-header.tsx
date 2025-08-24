import MenuBg from '@/assets/images/home/home-nav-bg.webp';
import MobileBtnSvg from '@/assets/svgs/mobile-btn.svg';
import DarkBtn from '@/components/user/atoms/dark-btn';
import Logo from '@/components/user/atoms/logo';
import PrimaryBtn from '@/components/user/atoms/primary-btn';
import RedBtn from '@/components/user/atoms/red-btn';
import useToggle from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import {
    ArrowRightStartOnRectangleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { XIcon } from 'lucide-react';

type AccountHeaderProps = {
    className?: string;
};

export default function AccountHeader({ className }: AccountHeaderProps) {
    const [show, toggleShow] = useToggle(false);

    return (
        <header
            className={cn(
                'sticky top-0 z-100 flex items-center justify-between gap-x-5 px-7 text-white backdrop-blur-lg md:relative md:mx-7 md:px-0 lg:mx-14 xl:mr-23 xl:ml-27 2xl:mr-28 2xl:ml-41',
                className,
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    'absolute top-0 bottom-0 left-1/2 -z-10 w-[120vw] -translate-x-1/2 bg-account-header-bg',
                    className,
                )}
            ></div>

            <Logo className="mt-2.5 mb-2 ml-1 text-4xl sm:mt-5 sm:mb-4 sm:text-6xl md:mt-7 md:mb-5 md:text-4xl lg:text-6xl" />

            <NavMenu
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
};

function NavMenu({ className, close, show }: NavMenuProps) {
    const { url } = usePage();

    function handleScrollDown() {
        close();
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }

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

            <nav
                aria-label="Основная навигация"
                className="md:mx-auto"
            >
                <ul className="mt-12 space-y-15 text-center text-xl md:mt-0 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 md:text-sm lg:gap-10 xl:gap-15 xl:text-base">
                    <NavLink>
                        <RedBtn
                            href={route('shop')}
                            className="mx-auto py-[0.3rem]"
                        >
                            Магазин
                        </RedBtn>
                    </NavLink>
                    <NavLink>
                        <button
                            className="cursor-pointer"
                            onClick={handleScrollDown}
                        >
                            Контакты
                        </button>
                    </NavLink>
                </ul>
            </nav>

            {url.endsWith('account/profile') ? (
                <DarkBtn
                    className="mx-auto md:mx-0 shrink-0 md:bg-dark-green mt-15 mb-50 md:my-0 md:hover:bg-dark-green/90 text-lg md:text-sm lg:text-base md:mr-0"
                    href={route('account')}
                >
                    Личный кабинет
                </DarkBtn>
            ) : (
                <div className="mt-15 mb-50 shrink-0 space-y-15 text-center text-lg md:my-0 md:flex md:items-center md:gap-7 md:space-y-0 md:text-sm lg:gap-10 xl:text-base">
                    <NavLink>
                        <Link
                            href={route('account.index')}
                            as="button"
                            className="mx-auto flex cursor-pointer items-center gap-2"
                        >
                            <Cog6ToothIcon className="hidden size-6.5 md:block" />
                            Настройки
                        </Link>
                    </NavLink>

                    <NavLink>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mx-auto flex cursor-pointer items-center gap-2"
                        >
                            <ArrowRightStartOnRectangleIcon className="hidden size-6.5 md:block" />
                            Выйти
                        </Link>
                    </NavLink>
                </div>
            )}
        </div>
    );
}

type NavLinkProps = {
    children: React.ReactNode;
};

function NavLink({ children }: NavLinkProps) {
    return (
        <li className="list-none transition-colors duration-200 ease-in hover:text-very-bright-salad">
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
