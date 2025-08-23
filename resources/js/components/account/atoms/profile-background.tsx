import TinyDesktopBg from '@/assets/images/account/account-settings-bg-tiny.webp';
import DesktopBg from '@/assets/images/account/account-settings-bg.webp';

import TinyMobileBg from '@/assets/images/account/account-settings-bg-mobile-tiny.webp';
import MobileBg from '@/assets/images/account/account-settings-bg-mobile.webp';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ProfileBackground() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-5 overflow-clip bg-main-page-bg"
        >
            <picture
                className={cn(
                    'block size-full object-cover object-center transition-all duration-500 ease-in-out',
                    isLoading && 'opacity-0',
                )}
            >
                <source
                    srcSet={DesktopBg}
                    media="(min-width: 900px)"
                />
                <img
                    onLoad={() => setIsLoading(false)}
                    src={MobileBg}
                    alt=""
                    className="block size-full object-cover object-left-top"
                />
            </picture>

            <div
                role="status"
                aria-label="Фото загружается"
                className="absolute inset-0 -z-5 flex h-full max-h-screen w-full items-center justify-center"
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
                        'block size-full object-cover object-center transition-all duration-500 ease-in-out'
                    )}
                >
                    <source
                        srcSet={TinyDesktopBg}
                        media="(min-width: 900px)"
                    />
                    <img
                        onLoad={() => setIsLoading(false)}
                        src={TinyMobileBg}
                        alt=""
                        className="block size-full object-cover object-left-top"
                    />
                </picture>
            </div>
        </div>
    );
}
