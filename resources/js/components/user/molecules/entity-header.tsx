import LikeBtn from '@/components/shared/atoms/like-btn';
import { cn } from '@/lib/utils';

type EntityHeaderProps = {
    title: string;
    description?: string;
    isFavorite?: boolean | null;
    favoriteRoute?: string;
};

export default function EntityHeader({
    title,
    description,
    isFavorite = null,
    favoriteRoute,
}: EntityHeaderProps) {
    return (
        <>
            {isFavorite !== null && favoriteRoute && (
                <LikeBtn
                    isLiked={isFavorite}
                    route={favoriteRoute}
                    className="mx-auto my-2 w-fit cursor-pointer md:my-8 lg:my-10"
                />
            )}

            <h1
                className={cn(
                    'text-center font-heading text-2xl font-medium text-balance text-text-black uppercase md:text-5xl xl:text-6xl',
                    isFavorite === null && 'mt-10 md:mt-20 xl:mt-30',
                )}
            >
                {title}
            </h1>

            {description && (
                <p className="mt-6 text-center text-sm text-pretty text-gray-dark sm:text-base md:mt-12 md:text-lg xl:mt-16 xl:text-xl">
                    {description}
                </p>
            )}
        </>
    );
}
