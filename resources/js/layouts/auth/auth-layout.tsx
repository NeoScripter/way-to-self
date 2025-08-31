import TinyLargeBg from '@/assets/images/auth/auth-bg-desktop-tiny.webp';
import LargeBg from '@/assets/images/auth/auth-bg-desktop.webp';
import TinyMobileBg from '@/assets/images/auth/auth-bg-tablet-tiny.webp';
import MobileBg from '@/assets/images/auth/auth-bg-tablet.webp';
import House from '@/assets/svgs/house.svg';
import ShoppingCart from '@/assets/svgs/shopping-cart.svg';
import LazyImage from '@/components/user/atoms/lazy-image';
import Logo from '@/components/user/atoms/logo';
import RedBtn from '@/components/user/atoms/red-btn';
import useMediaQuery from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const backgroundImage = isDesktop ? LargeBg : MobileBg;
    const placeholderImage = isDesktop ? TinyLargeBg : TinyMobileBg;

    return (
        <div className="relative z-5 flex min-h-svh flex-col gap-4 bg-main-page-bg">
            {/* Header */}
            <header
                className={cn(
                    'relative z-20 flex shrink-0 items-center justify-between bg-black/40',
                    'gap-x-5 p-4 text-white sm:py-0 md:px-7 lg:px-14 xl:px-27',
                )}
            >
                <Logo
                    className="mt-2.5 mb-2 ml-1 text-3xl sm:mt-5 sm:mb-4 sm:text-5xl md:mt-7 md:mb-5 md:text-6xl"
                    aria-label="Логотип компании"
                />
                <div className="flex shrink-0 items-center gap-2 text-xs sm:mr-4 sm:gap-10 md:text-base md:mr-6 xl:text-lg">
                    <RedBtn
                        href={route('shop')}
                        className="rounded-full p-1.5 sm:px-[1.25em] sm:py-[0.3rem]"
                    >
                        <div className="size-5 sm:hidden">
                            <img
                                src={ShoppingCart}
                                aria-hidden="true"
                                alt=""
                                className="size-full object-contain object-center"
                            />
                        </div>
                        <span className="hidden sm:block">Магазин</span>
                    </RedBtn>
                    <Link
                        as="button"
                        href={route('home')}
                        className="cursor-pointer transition-all duration-200 ease-in hover:underline underline-offset-3"
                    >
                        <div className="glow-shadow size-6.5 transition duration-200 ease-in hover:scale-105 sm:hidden">
                            <img
                                src={House}
                                aria-hidden="true"
                                alt=""
                                className="size-full object-contain object-center"
                            />
                        </div>
                        <span className="hidden sm:block">Главная</span>
                    </Link>
                </div>
            </header>

            {/* Background Image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-15"
                role="presentation"
            >
                <LazyImage
                    img={backgroundImage}
                    alt=""
                    tinyImg={placeholderImage}
                    imgClass="md:object-top"
                    parentClass="size-full"
                />
            </div>

            {/* Main Content */}
            <main
                className="flex h-full flex-1 items-center justify-center"
                role="main"
                aria-live="polite"
            >
                <div className="relative z-20 w-9/10 max-w-192 rounded-[50px] border border-white bg-display-backdrop-green px-4 py-13 backdrop-blur-md sm:px-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
