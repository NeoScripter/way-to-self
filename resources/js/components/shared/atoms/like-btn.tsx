import { cn } from '@/lib/utils';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import { Heart } from 'lucide-react';

type LikeBtnProps = {
    className?: string;
    iconClass?: string;
    route: string;
    isFavorite: boolean;
};

export default function LikeBtn({
    isFavorite,
    iconClass,
    className,
    route,
}: LikeBtnProps) {
    return (
        <Link
            className={cn('block w-fit cursor-pointer', className)}
            href={route}
            method="post"
            preserveState
            preserveScroll
        >
            {isFavorite ? (
                <HeartIcon
                    className={cn(
                        'size-6 text-red-500 sm:size-8 md:size-10 lg:size-12',
                        iconClass,
                    )}
                />
            ) : (
                <Heart
                    className={cn(
                        'size-6 text-black sm:size-8 md:size-10 lg:size-12',
                        iconClass,
                    )}
                />
            )}
        </Link>
    );
}
