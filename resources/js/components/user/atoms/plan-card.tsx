import { cn } from '@/lib/utils';
import { Image } from '@/types/model';
import LazyImage from './lazy-image';

type PlanCardProps = {
    image: Image | undefined;
    title: string;
    description: string;
    className?: string;
    price: number;
};

export default function PlanCard({
    image,
    title,
    description,
    className,
    price,
}: PlanCardProps) {
    return (
        <li
            className={cn(
                'relative mx-auto rounded-[3rem] border-white/20 bg-card-backdrop-gray/50 p-6.5 px-7 pt-26 pb-10 text-white backdrop-blur-sm sm:max-w-97 sm:rounded-[6rem] sm:px-9 sm:pt-35 xl:max-w-full xl:px-10 xl:pt-34 xl:pb-9',
                className,
            )}
            role="article"
            aria-label="Карточка с тарифом"
        >
            {image && (
                <LazyImage
                    img={image.path}
                    tinyImg={image.tiny_path}
                    alt={image.alt}
                    imgClass="size-full object-cover object-center"
                    parentClass="absolute top-0 left-1/2 size-42 -translate-1/2 overflow-clip rounded-full sm:size-53.5"
                />
            )}

            <h4 className="mb-4 text-center font-heading text-3xl sm:mb-6 sm:text-5xl">
                {title}
            </h4>

            <p className="mb-4 text-center text-sm text-balance sm:mb-6 sm:text-base 2xl:text-xl">
                {description}
            </p>

            <p className="text-center font-heading text-3xl text-balance sm:text-5xl">{`${price}р`}</p>
        </li>
    );
}
