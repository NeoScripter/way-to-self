import LikeBtn from '@/components/shared/atoms/like-btn';

type EntityHeaderProps = {
    title: string;
    description?: string;
    isFavorite?: boolean;
    favoriteRoute?: string;
    className?: string;
};

export default function EntityHeader({
    title,
    description,
    isFavorite,
    favoriteRoute,
}: EntityHeaderProps) {
    return (
        <>
            {isFavorite != null && favoriteRoute && (
                <LikeBtn
                    isLiked={isFavorite}
                    route={favoriteRoute}
                    className="mx-auto mb-2 w-fit cursor-pointer text-center md:mb-8 lg:mb-10"
                />
            )}

            <h1 className="text-center font-heading text-2xl font-medium text-balance text-text-black uppercase sm:text-3xl md:text-5xl xl:text-6xl">
                {title}
            </h1>

            {description && (
                <p className="mt-3 text-center text-sm text-pretty text-gray-dark sm:text-base md:mt-6 md:text-lg xl:mt-16 xl:text-xl">
                    {description}
                </p>
            )}
        </>
    );
}
