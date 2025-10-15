import { cn } from '@/lib/utils';
import { ArrowLongUpIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

type BackToTopBtnProps = {
    className?: string;
};

export default function BackToTopBtn({ className }: BackToTopBtnProps) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const shouldShow = window.scrollY > 600;
            setShow(shouldShow);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleClick() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    if (!show) return null;

    return (
        <button
            onClick={handleClick}
            className={cn(
                'glow-shadow fixed right-10 bottom-10 z-50 hidden size-30 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-card-backdrop-gray transition duration-200 ease-in hover:scale-110 md:flex 2xl:right-25 2xl:bottom-25',
                className,
            )}
        >
            <ArrowLongUpIcon className="size-20 text-white" />
        </button>
    );
}
