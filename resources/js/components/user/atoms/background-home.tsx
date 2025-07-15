import MobileBg from "@/assets/images/home/home-mb-hero.webp";
import TabletBg from "@/assets/images/home/home-tbt-hero.webp";
import DesktopBg from "@/assets/images/home/home-dsk-hero.webp";

export default function BackgroundHome() {
    return (
        <div aria-hidden="true" className="absolute inset-0 -z-5">
            <picture>
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
                    className="object-cover object-top w-full h-full"
                />
            </picture>
        </div>
    );
}
