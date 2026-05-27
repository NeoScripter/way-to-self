import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type SecondaryBtnProps = {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    prefetch?: boolean;
    className?: string;
};

export default function SecondaryBtn({
    children,
    href,
    onClick,
    prefetch = true,
    className,
}: SecondaryBtnProps) {
    const baseClass = cn(
        'block w-max cursor-pointer rounded-full border-2 border-white px-[1.25em] py-[0.75em] text-center text-white transition-colors duration-200 ease-in-out hover:bg-dark-swamp/60',
        className,
    );

    if (href != null) {
        return (
            <Link
                as="button"
                href={href}
                {...(prefetch ? { prefetch } : {})}
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
