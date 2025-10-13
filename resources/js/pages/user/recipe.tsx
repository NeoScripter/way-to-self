import DishSvg from '@/assets/svgs/dish-black.svg';
import ClockSvg from '@/assets/svgs/time-black.svg';
import LazyImage from '@/components/user/atoms/lazy-image';
import DialogLayout from '@/components/user/molecules/dialog-layout';
import EntityHeader from '@/components/user/molecules/entity-header';
import RecipeInfo from '@/components/user/molecules/recipe-info';
import VideoPlayer from '@/components/user/molecules/video-player';
import AppLayout from '@/layouts/user/app-layout';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { cn } from '@/lib/utils';
import { Image, Recipe as RecipeType } from '@/types/model';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Recipe() {
    const { recipe, video, isFavorite } = usePage<{
        recipe: RecipeType;
        video: string;
        isFavorite: boolean | null;
    }>().props;

    const [zoomedImg, setZoomedImg] = useState<Image | null>(null);

    const handleClick = (image: Image | undefined) => {
        if (!image) return;

        setZoomedImg(image);
    };

    return (
        <AppLayout
            variant="guest"
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <EntityHeader
                    title={recipe.title}
                    description={recipe.description}
                    isFavorite={isFavorite}
                    favoriteRoute={route(
                        'nutrition.recipes.favorite',
                        recipe.id,
                    )}
                />

                <RecipeStats recipe={recipe} />

                {video && <VideoPlayer src={video} />}

                <div className="mt-6 md:mt-16 lg:flex lg:items-start lg:gap-13 xl:gap-15">
                    <div className="space-y-5 rounded-4xl bg-card-backdrop-gray p-4 md:space-y-6 md:p-6 lg:order-2">
                        {recipe.infos?.map((info) => (
                            <RecipeInfo
                                key={info.id}
                                info={info}
                                onClick={() => handleClick(info?.image)}
                            />
                        ))}
                    </div>
                    <LightBox
                        img={zoomedImg}
                        onClose={() => setZoomedImg(null)}
                    />

                    <div className="prose prose-sm mt-6 mb-33 max-w-172 prose-neutral md:prose-base md:mt-12 md:mb-37 lg:mt-0 xl:prose-xl xl:mb-53">
                        {recipe.steps?.map((step, idx) => (
                            <div key={step.id}>
                                {step.image && (
                                    <LazyImage
                                        parentClass="my-6 md:my-10 aspect-video rounded-2xl"
                                        img={step.image.path}
                                        tinyImg={step.image.tiny_path}
                                        alt={step.image.alt}
                                    />
                                )}
                                <div
                                    className={cn(
                                        idx === 0 && 'no-heading-margin',
                                    )}
                                    dangerouslySetInnerHTML={{
                                        __html: step.html,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </AppLayout>
    );
}

type LightBoxProps = {
    img: Image | null;
    onClose: () => void;
};

function LightBox({ img, onClose }: LightBoxProps) {
    if (img == null) return null;

    return (
        <DialogLayout
            show={img != null}
            onClose={onClose}
            className="mx-auto max-w-180 text-black"
        >
            <LazyImage
                parentClass="aspect-video rounded-2xl"
                img={img.path}
                tinyImg={img.tiny_path}
                alt={img.alt}
            />
        </DialogLayout>
    );
}

type RecipeStatsType = {
    recipe: RecipeType;
};

function RecipeStats({ recipe }: RecipeStatsType) {
    const roundedDuration = roundDuration(recipe.duration);
    return (
        <div className="mx-auto my-6 flex max-w-75 items-center justify-between text-sm text-text-black md:my-10 md:max-w-80 md:text-base xl:my-12">
            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`${recipe.duration} минут`}
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
                aria-label={`Оценка: ${recipe.complexity} из 10`}
            >
                <AcademicCapIcon
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                <span>{`${recipe.complexity}/10`}</span>
            </div>

            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`Категория: ${recipe.category?.name}`}
            >
                <img
                    src={DishSvg}
                    alt=""
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                {recipe.category && <span>{recipe.category.name}</span>}
            </div>
        </div>
    );
}
