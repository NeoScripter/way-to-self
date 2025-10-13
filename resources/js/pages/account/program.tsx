import ClockSvg from '@/assets/svgs/time-black.svg';
import EntityHeader from '@/components/account/molecules/entity-header';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import ContentCard from '@/components/user/atoms/content-card';
import VideoPlayer from '@/components/user/molecules/video-player';
import AppLayout from '@/layouts/user/app-layout';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { ProgramBlock, Program as ProgramType } from '@/types/model';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';

export default function Program() {
    const { program, video, labels, isFavorite } = usePage<{
        program: ProgramType;
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
            <article className="mx-auto max-w-330 pb-33 md:pb-37 xl:pb-53">
                <Breadcrumbs
                    className="mt-7 sm:mt-11 md:mt-15 xl:mt-18"
                    itemName={`Программа №${program.id}`}
                    labels={labels}
                />

                <EntityHeader
                    title={program.title}
                    isFavorite={isFavorite}
                    favoriteRoute={route('body.programs.favorite', program.id)}
                />

                <ProgramStats program={program} />

                {video && (
                    <VideoPlayer
                        src={video}
                        className="mb-10 block md:mb-12 xl:mb-15"
                    />
                )}

                <div
                    className="prose prose-sm mb-9 block max-w-full prose-neutral md:prose-base md:mb-12 lg:mb-0 xl:prose-xl xl:mb-15"
                    dangerouslySetInnerHTML={{
                        __html: program.html,
                    }}
                ></div>

                {program.blocks &&
                    program.blocks.map((block) => (
                        <Block
                            key={block.id}
                            block={block}
                        />
                    ))}
            </article>
        </AppLayout>
    );
}

type BlockProps = {
    block: ProgramBlock;
};

function Block({ block }: BlockProps) {
    return (
        <section>
            <h2 className="mt-10 text-center font-heading text-2xl font-medium text-balance text-text-black uppercase sm:text-3xl md:mt-20 md:text-5xl xl:mt-24 xl:text-6xl">
                {block.title}
            </h2>

            <p className="my-6 text-center text-sm text-pretty text-gray-dark sm:text-base md:my-12 md:text-lg xl:my-16 xl:text-xl">
                {block.description}
            </p>

            <ul className="grid w-full shrink-0 gap-6 sm:grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] xl:grid-cols-3">
                {block.exercises &&
                    block.exercises.map((item) => (
                        <ContentCard
                            key={item.id}
                            type="exercises"
                            className="mx-auto w-full max-w-80"
                            data={{
                                href: route('body.exercises.show', item.id),
                                name: item.title,
                                img: item.image?.path,
                                tinyImg: item.image?.tiny_path,
                                alt: item.image?.alt,
                                description: item.description,
                                duration:
                                    'duration' in item
                                        ? item.duration
                                        : undefined,
                                complexity:
                                    'complexity' in item
                                        ? item.complexity
                                        : undefined,
                                category:
                                    'category' in item
                                        ? item.category?.name
                                        : undefined,
                            }}
                        />
                    ))}
            </ul>
        </section>
    );
}

type ProgramStatsType = {
    program: ProgramType;
};

function ProgramStats({ program }: ProgramStatsType) {
    const roundedDuration = roundDuration(program.duration);
    return (
        <div className="mx-auto my-6 flex max-w-75 items-center justify-between text-sm md:my-10 md:max-w-80 md:text-base xl:my-12">
            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`${program.duration} минут`}
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
                aria-label={`Оценка: ${program.complexity} из 10`}
            >
                <AcademicCapIcon
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />

                <span>{`${program.complexity}/10`}</span>
            </div>
        </div>
    );
}
