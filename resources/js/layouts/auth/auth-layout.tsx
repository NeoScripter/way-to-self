import LazyImage from '@/components/user/atoms/lazy-image';
import Logo from '@/components/user/atoms/logo';
import LargeBg from '@/assets/images/auth/auth-bg-desktop.webp';
import MobileBg from '@/assets/images/auth/auth-bg-tablet.webp';
import TinyLargeBg from '@/assets/images/auth/auth-bg-desktop-tiny.webp';
import TinyMobileBg from '@/assets/images/auth/auth-bg-tablet-tiny.webp';
import PrimaryBtn from '@/components/user/atoms/primary-btn';
import useMediaQuery from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import RedBtn from '@/components/user/atoms/red-btn';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
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
                <RedBtn
                    href={route('shop')}
                    className="py-[0.3rem] shrink-0 text-xs md:text-base xl:text-lg"
                >
                    Магазин
                </RedBtn>
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
                {children}
            </main>
        </div>
    );
}
