import ClockSvg from "@/assets/svgs/clock.svg";
import StarSvg from "@/assets/svgs/star.svg";
import PulseSvg from "@/assets/svgs/pulse.svg";
import DishSvg from "@/assets/svgs/dish.svg";
import { cn } from "@/lib/utils";
import { shortenDescription } from "@/lib/helpers/shortenDescription";
import { roundDuration } from "@/lib/helpers/roundDuration";

const MAX_WORDS = 15;

type SharedCardProps = {
    name: string;
    img: string;
    alt: string;
    description: string;
    duration: number;
    rating: number;
    category: string;
};

type ContentCardProps = {
    type: "exercise" | "recipe";
    data: SharedCardProps;
    className?: string;
};

export default function ContentCard({ type, data, className }: ContentCardProps) {
    const { name, img, alt, description, duration, rating, category } = data;
    const roundedDuration = roundDuration(duration);
    const shortenedDescription = shortenDescription(description, MAX_WORDS);

    const categoryIcon = type === "exercise" ? PulseSvg : DishSvg;
    const durationLabel = type === "exercise" ? "Время упражнения" : "Время приготовления";
    const labelPrefix = type === "exercise" ? "Упражнение" : "Рецепт";

    return (
        <li
            className={cn("border-white/20 backdrop-blur-sm bg-card-backdrop-gray/50 w-80 h-130 text-white rounded-[3rem] p-6.5 cursor-pointer transition-scale duration-200 ease-in hover:scale-105", className)}
            role="article"
            aria-label={`${labelPrefix}: ${name}`}
        >
            <div className="overflow-clip rounded-[2rem] mb-5 h-57">
                <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    className="size-full object-center object-cover"
                />
            </div>

            <div className="px-2.5 flex h-54 flex-col justify-between gap-2">
                <h3 className="text-2xl leading-7 text-balance text-white text-center mb-2.5">
                    {name}
                </h3>

                <p className="flex-1">{shortenedDescription}</p>

                <div className="flex mt-auto items-center justify-between">
                    <div className="flex items-center gap-1" aria-label={`${durationLabel}: ${duration} минут`}>
                        <img src={ClockSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{roundedDuration}</span>
                    </div>

                    <div className="flex items-center gap-1" aria-label={`Оценка: ${rating} из 10`}>
                        <img src={StarSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{`${rating}/10`}</span>
                    </div>

                    <div className="flex items-center gap-1" aria-label={`Категория: ${category}`}>
                        <img src={categoryIcon} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{category}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}
