import { cn } from '@/lib/utils';
import { useState } from 'react';

type LazyImageProps = {
    parentClass?: string;
    imgClass?: string;
    img: string;
    alt: string;
    tinyImg: string;
};

export default function LazyImage({
    parentClass,
    imgClass,
    img,
    alt,
    tinyImg,
}: LazyImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure
            role="img"
            className={cn('relative overflow-clip', parentClass)}
            aria-label={alt}
        >
            <img
                onLoad={() => setIsLoading(false)}
                src={img}
                alt={alt}
                loading="lazy"
                className={cn(
                    'size-full object-cover object-center transition-all duration-500 ease-in-out',
                    imgClass,
                    isLoading && 'opacity-0',
                )}
                aria-hidden={isLoading}
            />
            {isLoading && (
                <div
                    role="status"
                    aria-label="Фото загружается"
                    className="absolute inset-0 z-10 flex items-center justify-center"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 z-10 size-full animate-pulse bg-gray-200/50"
                    ></div>

                    <img
                        aria-hidden={!isLoading}
                        src={tinyImg}
                        alt={alt}
                        className="size-full object-cover object-center"
                    />
                </div>
            )}
        </figure>
    );
}
