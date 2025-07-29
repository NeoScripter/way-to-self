import { cn } from "@/lib/utils";
import { useState } from "react";

type LazyImageProps = {
    parentClass?: string;
    imgClass?: string;
    img: string;
    alt: string;
    tinyImg: string;
}

export default function LazyImage({ parentClass, imgClass, img, alt, tinyImg }: LazyImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure
            role="img"
            className={cn("overflow-clip relative", parentClass)}
            aria-label={alt}
        >
            <img
                onLoad={() => setIsLoading(false)}
                src={img}
                alt={alt}
                loading="lazy"
                className={cn(
                    'object-center object-cover size-full transition-all duration-500 ease-in-out', imgClass,
                    isLoading && 'opacity-0'
                )}
                aria-hidden={isLoading}
            />
            {isLoading && (
                <div
                    role="status"
                    aria-label="Фото загружается"
                    className="inset-0 absolute z-10 flex items-center justify-center"
                >
                    <div
                        aria-hidden="true"
                        className="animate-pulse size-full bg-gray-200/50 absolute z-10 inset-0"
                    ></div>

                    <img
                        aria-hidden={!isLoading}
                        src={tinyImg} alt={alt} className="object-center object-cover size-full"
                    />
                </div>
            )}
        </figure>
    )
}
