import ClockSvg from '@/assets/svgs/time-black.svg';
import EntityHeader from '@/components/account/molecules/entity-header';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LikeBtn from '@/components/shared/atoms/like-btn';
import VideoPlayer from '@/components/user/molecules/video-player';
import AppLayout from '@/layouts/user/app-layout';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { Exercise as ExerciseType } from '@/types/model';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import { Dumbbell } from 'lucide-react';

export default function Exercise() {
    const { exercise, video, labels, isFavorite } = usePage<{
        exercise: ExerciseType;
        video: string;
        labels: string[];
        isFavorite: boolean;
    }>().props;

    return (
        <AppLayout
            variant="tier"
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <Breadcrumbs
                    className="mt-7 sm:mt-11 md:mt-15 xl:mt-18"
                    itemName={`Упражнение №${exercise.id}`}
                    labels={labels}
                />

                <EntityHeader
                    title={exercise.title}
                    isFavorite={isFavorite}
                    favoriteRoute={route(
                        'body.exercises.favorite',
                        exercise.id,
                    )}
                />

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
                aria-label={`Оценка: ${exercise.complexity} из 10`}
            >
                <AcademicCapIcon
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />

                <span>{`${exercise.complexity}/10`}</span>
            </div>

            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`Категория: ${exercise.category?.name}`}
            >
                <Dumbbell
                    className="size-6 text-text-black md:size-7"
                    aria-hidden="true"
                />
                {exercise.category && <span>{exercise.category.name}</span>}
            </div>
        </div>
    );
}
