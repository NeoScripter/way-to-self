import { cn } from "@/lib/utils";

type ArtLayerProps = {
    img: string;
    className?: string;
    imgClassName?: string;
}

export default function ArtLayer({ img, className, imgClassName }: ArtLayerProps) {
    return (
        <figure aria-hidden="true" className={cn("absolute overflow-clip", className)}>
            <img src={img} alt="" loading="lazy" className={cn("size-full object-center object-contain", imgClassName)} />
        </figure>
    )
}
