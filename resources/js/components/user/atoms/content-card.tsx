import ClockSvg from '@/assets/svgs/clock.svg';
import DishSvg from '@/assets/svgs/dish.svg';
import PulseSvg from '@/assets/svgs/pulse.svg';
import StarSvg from '@/assets/svgs/star.svg';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { shortenDescription } from '@/lib/helpers/shortenDescription';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import LazyImage from './lazy-image';

const MAX_WORDS = 12;

type SharedCardProps = {
    href: string;
    name: string;
    img: string | undefined;
    alt: string | undefined;
    tinyImg: string | undefined;
    description: string;
    duration: number;
    rating: number;
    category: string | undefined;
};

type ContentCardProps = {
    type: 'exercise' | 'recipe';
    data: SharedCardProps;
    className?: string;
};

export default function ContentCard({
    type,
    data,
    className,
}: ContentCardProps) {
    const {
        href,
        name,
        img,
        tinyImg,
        alt,
        description,
        duration,
        rating,
        category,
    } = data;
    const roundedDuration = roundDuration(duration);
    const shortenedDescription = shortenDescription(description, MAX_WORDS);

    const categoryIcon = type === 'exercise' ? PulseSvg : DishSvg;
    const durationLabel =
        type === 'exercise' ? 'Время упражнения' : 'Время приготовления';
    const labelPrefix = type === 'exercise' ? 'Упражнение' : 'Рецепт';

    return (
        <li
            className={cn(
                'transition-scale min-h-130 w-80 cursor-pointer rounded-[3rem] border-white/20 bg-card-backdrop-gray/50 p-6.5 text-white backdrop-blur-sm duration-200 ease-in hover:scale-105',
                className,
            )}
            role="article"
            aria-label={`${labelPrefix}: ${name}`}
        >
            <Link
                prefetch
                href={href}
            >
                {img && alt && tinyImg && (
                    <LazyImage
                        parentClass="overflow-clip rounded-[2rem] mb-5 h-57"
                        img={img}
                        alt={alt}
                        tinyImg={tinyImg}
                    />
                )}

                <div className="-mx-2 flex h-54 flex-col justify-between gap-2 px-2.5">
                    <h3 className="-mx-2 mb-2.5 text-center text-xl leading-7 text-balance text-white">
                        {name}
                    </h3>

                    <p className="mb-2 flex-1">{shortenedDescription}</p>

                    <div className="mt-auto flex items-center justify-between">
                        <div
                            className="flex items-center gap-1"
                            aria-label={`${durationLabel}: ${duration} минут`}
                        >
                            <img
                                src={ClockSvg}
                                alt=""
                                className="size-4.5"
                                aria-hidden="true"
                            />
                            <span className="text-sm">{roundedDuration}</span>
                        </div>

                        <div
                            className="flex items-center gap-1"
                            aria-label={`Оценка: ${rating} из 10`}
                        >
                            <img
                                src={StarSvg}
                                alt=""
                                className="size-4.5"
                                aria-hidden="true"
                            />
                            <span className="text-sm">{`${rating}/10`}</span>
                        </div>

                        <div
                            className="flex items-center gap-1"
                            aria-label={`Категория: ${category}`}
                        >
                            <img
                                src={categoryIcon}
                                alt=""
                                className="size-4.5"
                                aria-hidden="true"
                            />
                            {category && (
                                <span className="text-sm">{category}</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
