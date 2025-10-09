import MobileBtnSvg from '@/assets/svgs/mobile-btn.svg';
import DarkBtn from '@/components/user/atoms/dark-btn';
import Logo from '@/components/user/atoms/logo';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { UserIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';

type AdminHeaderProps = {
    className?: string;
    onClick: () => void;
    show: boolean;
};

export default function AdminHeader({ className, show, onClick }: AdminHeaderProps) {
    const { auth } = usePage<{ auth: Auth }>().props;

    return (
        <header
            className={cn(
                'sticky top-0 z-150 flex items-center justify-between gap-x-5 bg-light-swamp px-7 text-white md:px-13 xl:rounded-b-[2.25rem] xl:px-18 2xl:px-30',
                className,
            )}
        >
            <Logo className="mt-2.5 mb-2 ml-1 text-4xl sm:mt-5 sm:mb-4 sm:text-6xl md:mt-7 md:mb-5 lg:block" />

            <span className="hidden max-w-1/2 flex-1 text-xl font-bold uppercase lg:block xl:text-2xl">
                Панель администратора
            </span>

            <MobileBtn
                onClick={onClick}
                className="mt-0.5 xl:hidden"
                aria-expanded={show}
                aria-controls="mobile-navigation"
            />

            <DarkBtn
                className={cn('hidden items-center gap-2 text-lg xl:flex')}
                href={route('admin.dashboard')}
            >
                <UserIcon className="size-5 shrink-0" />
                {`${auth.user.name}`}
            </DarkBtn>
        </header>
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
