import MobileBg from "@/assets/images/home/hero/mobile.webp";
import TabletBg from "@/assets/images/home/hero/tablet.webp";
import DesktopBg from "@/assets/images/home/hero/desktop.webp";
import TinyDesktopBg from "@/assets/images/home/hero/desktop-tiny.webp";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BackgroundHome() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div aria-hidden="true" className="absolute bg-main-page-bg inset-0 -z-5 overflow-clip pointer-events-none">
            <picture className={cn("w-full block object-center object-cover size-full transition-all duration-500 ease-in-out", isLoading && 'opacity-0')}>
                <source
                    srcSet={DesktopBg}
                    media="(min-width: 1024px)"
                />
                <source
                    srcSet={TabletBg}
                    media="(min-width: 640px)"
                />
                <img
                    onLoad={() => setIsLoading(false)}
                    src={MobileBg}
                    alt=""
                    className="object-cover object-left-top w-full block"
                />
            </picture>

            <div
                role="status"
                aria-label="Фото загружается"
                className="inset-0 absolute -z-5 flex items-center justify-center w-full h-full max-h-screen"
            >
                <div
                    aria-hidden="true"
                    className={cn(isLoading && "animate-pulse size-full bg-gray-200/50 absolute inset-0")}
                ></div>

                <img
                    aria-hidden="true"
                    src={TinyDesktopBg} alt="" className="object-center object-cover size-full"
                />
            </div>
        </div>
    );
}
