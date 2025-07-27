import { cn } from "@/lib/utils";
import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type BackToTopBtnProps = {
    className?: string;
}

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
            behavior: 'smooth'
        });
    }

    if (!show) return null;

    return (
        <button onClick={handleClick} className={cn("hidden md:flex rounded-full z-50 border border-white/20 cursor-pointer bg-card-backdrop-gray items-center justify-center size-30 fixed bottom-10 right-10 2xl:right-25 2xl:bottom-25 transition duration-200 ease-in hover:scale-110 glow-shadow", className)}>
            <ArrowLongUpIcon className="text-white size-20" />
        </button>
    )
}
