import MobileBg from "@/assets/images/home/hero/mobile.webp";
import TabletBg from "@/assets/images/home/hero/tablet.webp";
import DesktopBg from "@/assets/images/home/hero/desktop.webp";

export default function BackgroundHome() {
    return (
        <div aria-hidden="true" className="absolute bg-main-page-bg inset-0 -z-5">
            <picture className="w-full block bg-main-page-bg">
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
                    className="object-cover object-left-top w-full block"
                />
            </picture>
        </div>
    );
}
