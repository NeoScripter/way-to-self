import { cn } from '@/lib/utils';
import { useState } from 'react';

type BgImageProps = {
    pictureClass?: string;
    imageClass?: string;
    mobileTinyPath: string;
    mobilePath: string;
    desktopTinyPath: string;
    desktopPath: string;
};

export default function BgImage({
    pictureClass,
    imageClass,
    mobilePath,
    mobileTinyPath,
    desktopPath,
    desktopTinyPath,
}: BgImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-5 overflow-clip"
        >
            <picture
                className={cn(
                    'block w-full object-contain object-center transition-all duration-500 ease-in-out',
                    pictureClass,
                    isLoading && 'opacity-0',
                )}
            >
                <source
                    srcSet={desktopPath}
                    media="(min-width: 900px)"
                />
                <img
                    onLoad={() => setIsLoading(false)}
                    src={mobilePath}
                    alt=""
                    className={cn(
                        'block w-full object-contain object-left-top',
                        imageClass,
                    )}
                />
            </picture>

            <div
                role="status"
                aria-label="Фото загружается"
                className={cn(
                    'absolute inset-0 -z-5 flex h-full max-h-screen w-full items-center justify-center',
                    !isLoading && 'opacity-0',
                )}
            >
                <div
                    aria-hidden="true"
                    className={cn(
                        isLoading &&
                            'absolute inset-0 size-full animate-pulse bg-gray-200/50',
                    )}
                ></div>

                <picture
                    aria-hidden="true"
                    className={cn(
                        'block size-full object-cover object-center transition-all duration-500 ease-in-out',
                        pictureClass,
                    )}
                >
                    <source
                        srcSet={desktopTinyPath}
                        media="(min-width: 900px)"
                    />
                    <img
                        onLoad={() => setIsLoading(false)}
                        src={mobileTinyPath}
                        alt=""
                        className={cn(
                            'block size-full object-cover object-left-top',
                            imageClass,
                        )}
                    />
                </picture>
            </div>
        </div>
    );
}
