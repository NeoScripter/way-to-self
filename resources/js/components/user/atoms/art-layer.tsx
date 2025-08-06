import { cn } from "@/lib/utils";
import LazyImage from "./lazy-image";

type ArtLayerProps = {
    img: string;
    className?: string;
    imgClassName?: string;
}

export default function ArtLayer({ img, className, imgClassName }: ArtLayerProps) {
    return (
        <div aria-hidden="true" className={cn("absolute overflow-clip pointer-events-none", className)}>
            <LazyImage img={img} tinyImg={img} alt="" imgClass={cn("size-full object-center object-contain", imgClassName)} />
        </div>

    )
}
