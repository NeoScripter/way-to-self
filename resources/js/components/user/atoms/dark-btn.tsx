import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type DarkBtnProps = {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function DarkBtn({
    children,
    href,
    onClick,
    className,
    type,
}: DarkBtnProps) {
    const baseClass = cn(
        'block w-fit cursor-pointer rounded-full bg-dark-green px-[1.25em] py-[0.75em] text-center text-white shadow-lg shadow-dark-green/50 transition duration-200 ease-in-out hover:bg-dark-green/90 focus:ring-4 focus:ring-dark-swamp focus:outline-none',
        className,
    );

    if (href != null) {
        return (
            <Link
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
