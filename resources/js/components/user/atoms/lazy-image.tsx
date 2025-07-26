import { cn } from "@/lib/utils";
import { Image } from "@/types/model";
import { useState } from "react";

type LazyImageProps = {
    parentClass?: string;
    imgClass?: string;
    img: Image;
}

export default function LazyImage({ parentClass, imgClass, img }: LazyImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure
            role="img"
            className={cn("overflow-clip relative", parentClass)}
            aria-label={img.alt}
        >
            <img
                onLoad={() => setIsLoading(false)}
                src={img.path}
                alt={img.alt}
                loading="lazy"
                className={cn(
                    'object-center object-cover size-full transition duration-500 ease-in-out', imgClass,
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
                        src={img.tiny_path} alt={img.alt} className="object-center object-cover size-full"
                    />
                </div>
            )}
        </figure>
    )
}
