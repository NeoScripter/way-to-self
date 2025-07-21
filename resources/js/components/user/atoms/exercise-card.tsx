import ClockSvg from "@/assets/svgs/clock.svg";
import StarSvg from "@/assets/svgs/star.svg";
import PulseSvg from "@/assets/svgs/pulse.svg";
import { cn } from "@/lib/utils";
import { shortenDescription } from "@/lib/helpers/shortenDescription";
import { roundDuration } from "@/lib/helpers/roundDuration";
import { ExerciseData } from "../organisms/home/soul-section";

type ExerciseCardProps = {
    exercise: ExerciseData;
    className?: string;
}

const MAX_WORDS = 15;

export default function ExerciseCard({ exercise, className }: ExerciseCardProps) {
    const description = shortenDescription(exercise.description, MAX_WORDS);

    const duration = roundDuration(exercise.duration);

    return (
        <li
            className={cn("bg-card-backdrop-gray w-80 h-130 text-white rounded-[3rem] p-6.5", className)}
            role="article"
            aria-label={`Упражнение: ${exercise.name}`}
        >
            <div className="overflow-clip rounded-[2rem] mb-5 h-57">
                <img
                    src={exercise.img}
                    alt={exercise.alt}
                    className="size-full object-center object-cover"
                />
            </div>

            <div className="px-2.5 flex h-54 flex-col justify-between gap-2">
                <h3 className="text-2xl leading-7 text-balance text-white text-center mb-2.5">
                    {exercise.name}
                </h3>

                <p className="flex-1">{description}</p>

                <div className="flex mt-auto items-center justify-between">
                    <div className="flex items-center gap-1" aria-label={`Время упражнения: ${exercise.duration} минут`}>
                        <img src={ClockSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{duration}</span>
                    </div>

                    <div className="flex items-center gap-1" aria-label={`Оценка: ${exercise.rating} из 10`}>
                        <img src={StarSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{`${exercise.rating}/10`}</span>
                    </div>

                    <div className="flex items-center gap-1" aria-label={`Категория: ${exercise.category}`}>
                        <img src={PulseSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{exercise.category}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}
