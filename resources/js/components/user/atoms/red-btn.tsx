import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type RedBtnProps = {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export default function RedBtn({
    children,
    href,
    onClick,
    className,
}: RedBtnProps) {
    const baseClass = cn(
        'block w-max cursor-pointer rounded-full border-1 border-white bg-red-purple px-[1.25em] py-[0.75em] text-center text-white transition-colors duration-200 ease-in-out hover:bg-red-bright',
        className,
    );

    if (href != null) {
        return (
            <Link
                as="button"
                prefetch
                href={href}
                className={baseClass}
            >
                {children}
            </Link>
        );
    } else {
        return (
            <button
                onClick={onClick}
                className={baseClass}
            >
                {children}
            </button>
        );
    }
}
