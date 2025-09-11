import DishSvg from '@/assets/svgs/dish-black.svg';
import ClockSvg from '@/assets/svgs/time-black.svg';
import VideoPlayer from '@/components/user/molecules/video-player';
import AppLayout from '@/layouts/user/app-layout';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { Exercise as ExerciseType } from '@/types/model';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';

export default function Exercise() {
    const { exercise, video } = usePage<{
        exercise: ExerciseType;
        video: string;
    }>().props;

    return (
        <AppLayout
            variant="guest"
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <h1 className="mt-10 text-center font-heading text-2xl font-medium text-balance text-text-black uppercase sm:text-3xl md:mt-20 md:text-5xl xl:mt-24 xl:text-6xl">
                    {exercise.title}
                </h1>

                <p className="mt-6 text-center text-sm text-pretty text-gray-dark sm:text-base md:mt-12 md:text-lg xl:mt-16 xl:text-xl">
                    {exercise.description}
                </p>

                <ExerciseStats exercise={exercise} />

                {video && (
                    <VideoPlayer
                        src={video}
                        className="mb-10 block md:mb-12 xl:mb-15"
                    />
                )}

                <div
                    className="prose prose-sm mt-9 mb-33 block max-w-full prose-neutral md:prose-base md:mt-12 md:mb-37 lg:mt-0 xl:prose-xl xl:mt-15 xl:mb-53"
                    dangerouslySetInnerHTML={{
                        __html: exercise.html,
                    }}
                ></div>
            </article>
        </AppLayout>
    );
}

type ExerciseStatsType = {
    exercise: ExerciseType;
};

function ExerciseStats({ exercise }: ExerciseStatsType) {
    const roundedDuration = roundDuration(exercise.duration);
    return (
        <div className="mx-auto my-6 flex max-w-75 items-center justify-between text-sm md:my-10 md:max-w-80 md:text-base xl:my-12">
            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`${exercise.duration} минут`}
            >
                <img
                    src={ClockSvg}
                    alt=""
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                <span>{roundedDuration}</span>
            </div>

            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`Оценка: ${exercise.rating} из 10`}
            >
                <AcademicCapIcon
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />

                <span>{`${exercise.rating}/10`}</span>
            </div>

            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`Категория: ${exercise.category?.name}`}
            >
                <img
                    src={DishSvg}
                    alt=""
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                {exercise.category && <span>{exercise.category.name}</span>}
            </div>
        </div>
    );
}
