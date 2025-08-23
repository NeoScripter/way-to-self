import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type DarkBtnProps = {
    children: React.ReactNode;
    className?: string;
    href: string;
};

export default function DarkBtn({ children, className, href }: DarkBtnProps) {
    return (
        <Link
            prefetch
            href={href}
            className={cn(
                'block w-fit cursor-pointer rounded-full bg-dark-green px-[1.25em] py-[0.75em] text-center text-white shadow-lg shadow-dark-green/50 transition duration-200 ease-in-out hover:bg-dark-green/90 focus:ring-4 focus:ring-dark-swamp focus:outline-none',
                className,
            )}
        >
            {children}
        </Link>
    );
}
