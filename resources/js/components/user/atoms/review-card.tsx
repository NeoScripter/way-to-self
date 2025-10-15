import Quotes from '@/assets/svgs/quotes.svg';
import { cn } from '@/lib/utils';
import { Image } from '@/types/model';
import LazyImage from './lazy-image';

type ReviewCardProps = {
    id: number;
    img: Image | undefined;
    review: string;
    author: string;
    className?: string;
};

export default function ReviewCard({
    img,
    review,
    author,
    className,
}: ReviewCardProps) {
    return (
        <li
            className={cn(
                'flex w-75 shrink-0 flex-col items-center gap-3 rounded-3xl border-white/20 bg-white/50 px-7 pt-7 pb-10 backdrop-blur-sm sm:gap-5 md:w-168 md:flex-row md:items-start md:gap-7 lg:w-241 lg:px-12 lg:py-6 2xl:w-292.5 2xl:px-8',
                className,
            )}
        >
            {img && (
                <LazyImage
                    parentClass="shrink-0 rounded-3xl overflow-clip size-25 sm:size-52 lg:size-73.5"
                    img={img.path}
                    alt={img.alt}
                    tinyImg={img.tiny_path}
                />
            )}

            <div className="text-xs sm:text-sm md:my-3 lg:my-6 lg:text-base">
                <p className="mb-4.5 2xl:text-xl">{review}</p>
                <p className="font-bold text-black">{author}</p>
            </div>

            <div className="hidden md:block md:shrink-0">
                <img
                    src={Quotes}
                    alt=""
                    aria-hidden="true"
                    className="w-9 object-contain object-center"
                />
            </div>
        </li>
    );
}
