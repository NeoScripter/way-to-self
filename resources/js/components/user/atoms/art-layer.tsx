import { cn } from '@/lib/utils';
import LazyImage from './lazy-image';

type ArtLayerProps = {
    img: string;
    tinyImg?: string;
    className?: string;
    imgClassName?: string;
};

export default function ArtLayer({
    img,
    tinyImg,
    className,
    imgClassName,
}: ArtLayerProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute overflow-clip',
                className,
            )}
        >
            <LazyImage
                img={img}
                tinyImg={tinyImg ? tinyImg : img}
                alt=""
                imgClass={cn(
                    'size-full object-contain object-center',
                    imgClassName,
                )}
            />
        </div>
    );
}
