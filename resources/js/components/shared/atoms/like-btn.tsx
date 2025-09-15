import useToggle from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';

type LikeBtnProps = {
    isLiked: boolean;
    route: string;
    className?: string;
};

export default function LikeBtn({ isLiked, route, className }: LikeBtnProps) {
    const [liked, toggleLiked] = useToggle(isLiked);
    const [animating, toggleAnimating] = useToggle(false);
    const [disabled, setDisabled] = useState(false);

    function handleClick() {
        if (disabled) return;

        setDisabled(true);
        toggleAnimating(!liked);
        toggleLiked();

        router.visit(route, {
            method: 'post',
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setDisabled(false),
        });
    }

    return (
        <div
            className={cn(
                'flex flex-col items-center text-[5rem] md:text-[7rem]',
                className,
            )}
        >
            <button
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    'like-button',
                    liked && 'liked',
                    animating && 'animating',
                )}
            >
                <div className="like-wrapper">
                    <div className="ripple"></div>
                    <svg
                        className="heart size-3/5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                </div>
            </button>
            <small className="-mt-2 mb-[1.5em] text-xs font-medium sm:-mt-2 md:text-base xl:-mt-4">
                {isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
            </small>
        </div>
    );
}

