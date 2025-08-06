import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type PrimaryBtnProps = {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function PrimaryBtn({
    children,
    href,
    onClick,
    className,
    type,
}: PrimaryBtnProps) {
    const baseClass = cn(
        'block w-max cursor-pointer rounded-full bg-gradient-to-r from-light-swamp via-dark-swamp to-dark-green px-[1.25em] py-[0.75em] text-center text-white shadow-lg shadow-dark-green/50 transition duration-200 ease-in-out hover:bg-gradient-to-br focus:ring-4 focus:ring-light-swamp focus:outline-none dark:shadow-lg dark:shadow-dark-green/80 dark:focus:ring-dark-green',
        className,
    );

    if (href != null) {
        return (
            <Link
                prefetch
                as="button"
                href={href}
                className={baseClass}
            >
                {children}
            </Link>
        );
    } else {
        return (
            <button
                type={type ? type : 'button'}
                onClick={onClick}
                className={baseClass}
            >
                {children}
            </button>
        );
    }
}
