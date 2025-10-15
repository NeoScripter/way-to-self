import useWindowSize from '@/hooks/use-window-size';
import calculateSlideOffset from '@/lib/helpers/calculateSlideOffset';
import { range } from '@/lib/helpers/range';
import { cn } from '@/lib/utils';
import { Review } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducer, useRef } from 'react';
import ReviewCard from '../atoms/review-card';
import SpanHighlight from '../atoms/span-highlight';

type State = {
    currentIdx: number;
};

type Action =
    | { type: 'increment'; payload: number }
    | { type: 'decrement'; payload: number }
    | { type: 'jump'; payload: number };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'increment':
            return {
                currentIdx:
                    state.currentIdx === action.payload
                        ? 0
                        : state.currentIdx + 1,
            };
        case 'decrement':
            return {
                currentIdx:
                    state.currentIdx === 0
                        ? action.payload
                        : state.currentIdx - 1,
            };
        case 'jump':
            return {
                currentIdx: action.payload,
            };
        default:
            return {
                currentIdx: state.currentIdx,
            };
    }
}

export default function ReviewsSection() {
    const { reviews } = usePage<{ reviews: Review[] }>().props;

    const [state, dispatch] = useReducer(reducer, { currentIdx: 0 });
    const { width: windowSize } = useWindowSize();
    const touchStart = useRef<number | null>(null);

    function handleJumpToSlide(idx: number) {
        dispatch({
            type: 'jump',
            payload: idx,
        });
    }

    function handleIncrementSlide() {
        dispatch({
            type: 'increment',
            payload: reviews.length - 1,
        });
    }

    function handleDecrementSlide() {
        dispatch({
            type: 'decrement',
            payload: reviews.length - 1,
        });
    }

    function handleTouchStart(e: React.TouchEvent) {
        e.preventDefault();
        touchStart.current = e.touches[0].clientX;
    }

    function handleTouchEnd(e: React.TouchEvent) {
        e.preventDefault();
        if (touchStart.current === null) return;

        const deltaX = e.changedTouches[0].clientX - touchStart.current;

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                handleDecrementSlide();
            } else {
                handleIncrementSlide();
            }
        }

        touchStart.current = null;
    }

    const offset = calculateSlideOffset(windowSize);

    return (
        <>
            <h3
                id="reviews-section-title"
                className="mb-11 sm:mb-16 xl:mb-20"
            >
                <SpanHighlight
                    text="Отзывы участников"
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[8rem]"
                />
            </h3>

            <div className="mb-11 overflow-hidden sm:mb-16 xl:mb-20">
                <ul
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="ml-4 flex w-max gap-4 transition-transform duration-400 ease-in-out sm:ml-11 sm:gap-6 md:gap-8 xl:gap-10 2xl:ml-25 3xl:ml-40"
                    style={{
                        transform: `translateX(-${offset * state.currentIdx}px)`,
                    }}
                >
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            img={review.image}
                            review={review.body}
                            author={review.author}
                            id={review.id}
                        />
                    ))}
                </ul>
            </div>

            <div className="flex items-center justify-center gap-8 md:gap-12">
                <button
                    onClick={handleDecrementSlide}
                    className="group flex size-8 shrink-0 cursor-pointer items-center justify-center md:size-10"
                >
                    <ChevronLeft className="size-full text-bright-salad transition-colors duration-200 ease-in group-hover:text-very-bright-salad" />
                </button>

                <div className="flex items-center justify-between gap-5">
                    {range(0, reviews.length - 1).map((btnIdx) => (
                        <button
                            key={`carousel-btn-${btnIdx}`}
                            onClick={() => handleJumpToSlide(btnIdx)}
                            className={cn(
                                'size-3 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in hover:bg-very-bright-salad md:size-4',
                                btnIdx === state.currentIdx
                                    ? 'bg-bright-salad'
                                    : 'bg-white',
                            )}
                        ></button>
                    ))}
                </div>

                <button
                    onClick={handleIncrementSlide}
                    className="group flex size-8 shrink-0 cursor-pointer items-center justify-center md:size-10"
                >
                    <ChevronRight className="size-full text-bright-salad transition-colors duration-200 ease-in group-hover:text-very-bright-salad" />
                </button>
            </div>
        </>
    );
}
