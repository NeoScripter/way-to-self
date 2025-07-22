import { useEffect, useState } from 'react';

export type BreakpointConfig = {
    screen: number;
    values: {
        slide: number;
        gap: number;
    };
};

type UseCarouselOptions<T> = {
    slides: T[];
    offset: number;
    animationDuration?: number;
    breakpoints: BreakpointConfig[];
};

type UseCarouselReturn<T> = {
    slides: T[];
    offsetPx: number;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchEnd: (e: React.TouchEvent) => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
    shouldAnimate: boolean;
    animationDuration: number;
};

export function useCarousel<T>({
    slides,
    offset,
    animationDuration = 500,
    breakpoints,
}: UseCarouselOptions<T>): UseCarouselReturn<T> {
    const [carouselSlides, setCarouselSlides] = useState<T[]>([...slides]);
    const [multiplier, setMultiplier] = useState(0);
    /* const [currentSlide, setCurrentSlide] = useState(offset); */
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    useEffect(() => {
        setCarouselSlides([...slides]);
    }, [slides.length])

    const getOffset = () => {
        const width = screen.width;
        const config =
            breakpoints.find((bp) => width < bp.screen) ?? breakpoints[-1]!;
        return config.values.slide + config.values.gap;
    };

    const offsetPx = getOffset() * multiplier + getOffset() * offset;

    const handleSlide = (direction: 1 | -1) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setShouldAnimate(true);
        setMultiplier(direction);

        setTimeout(() => {
            setShouldAnimate(false);
            setMultiplier(0);

            setCarouselSlides((prev) =>
                direction === 1
                    ? [...prev.slice(1), prev[0]]
                    : [prev[prev.length - 1], ...prev.slice(0, -1)]
            );

        /*     setCurrentSlide((prev) =>
                direction === 1
                    ? (prev + 1) % carouselSlides.length
                    : (prev - 1 + carouselSlides.length) % carouselSlides.length
            ) */

            setIsAnimating(false);
        }, animationDuration);
    };

    const handleIncrement = () => handleSlide(1);
    const handleDecrement = () => handleSlide(-1);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX;

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                handleDecrement();
            } else {
                handleIncrement();
            }
        }

        setTouchStartX(null);
    };

    return {
        slides: carouselSlides,
        offsetPx,
        handleTouchStart,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        shouldAnimate,
        animationDuration,
    };
}
