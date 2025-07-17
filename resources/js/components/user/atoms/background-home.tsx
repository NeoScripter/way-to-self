import MobileBg from "@/assets/images/home/mobile.webp";
import TabletBg from "@/assets/images/home/tablet.webp";
import DesktopBg from "@/assets/images/home/desktop.webp";

export default function BackgroundHome() {
    return (
        <div aria-hidden="true" className="absolute bg-main-page-bg inset-0 -z-5">
            <picture className="size-full block bg-main-page-bg">
                <source
                    srcSet={DesktopBg}
                    media="(min-width: 1024px)"
                />
                <source
                    srcSet={TabletBg}
                    media="(min-width: 640px)"
                />
                <img
                    src={MobileBg}
                    alt=""
                    className="object-cover object-top w-full h-full block"
                />
            </picture>
        </div>
    );
}
