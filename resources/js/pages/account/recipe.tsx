import DishSvg from '@/assets/svgs/dish-black.svg';
import StarSvg from '@/assets/svgs/star-black.svg';
import ClockSvg from '@/assets/svgs/time-black.svg';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LazyImage from '@/components/user/atoms/lazy-image';
import DialogLayout from '@/components/user/molecules/dialog-layout';
import VideoPlayer from '@/components/user/molecules/video-player';
import AppLayout from '@/layouts/user/app-layout';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { cn } from '@/lib/utils';
import { Image, Recipe as RecipeType } from '@/types/model';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { Heart, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export default function Recipe() {
    const { recipe, video, isFavorite } = usePage<{
        recipe: RecipeType;
        video: string;
        isFavorite: boolean;
    }>().props;

    const [zoomedImg, setZoomedImg] = useState<Image | null>(null);

    return (
        <AppLayout
            variant="tier"
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <Breadcrumbs
                    className="my-7 sm:my-11 md:my-15 xl:my-18"
                    itemName={`Рецепт №${recipe.id}`}
                    labels={['Главная', 'Питание', 'Рецепты']}
                />
                <div className="relative">
                    <h1 className="text-center font-heading text-2xl font-medium text-balance text-text-black uppercase sm:text-3xl md:text-5xl xl:text-6xl">
                        {recipe.title}
                    </h1>

                    <Link
                        className="mx-auto mt-3 block w-fit cursor-pointer md:mt-6 lg:absolute lg:right-0 lg:top-0 lg:mt-0"
                        href={route('nutrition.recipes.favorite', recipe.id)}
                        method="post"
                        preserveState
                    >
                        {isFavorite ? (
                            <HeartIcon className="size-6 sm:size-8 md:size-10 lg:size-12 text-red-500" />
                        ) : (
                            <Heart className="size-6 sm:size-8 md:size-10 lg:size-12 text-black" />
                        )}
                    </Link>
                </div>

                <p className="mt-3 text-center text-sm text-pretty text-gray-dark sm:text-base md:mt-6 md:text-lg xl:mt-16 xl:text-xl">
                    {recipe.description}
                </p>

                <RecipeStats recipe={recipe} />

                {video && <VideoPlayer src={video} />}

                <div className="mt-6 md:mt-16 lg:flex lg:items-start lg:gap-13 xl:gap-15">
                    <div className="space-y-5 rounded-4xl bg-card-backdrop-gray p-4 md:space-y-6 md:p-6 lg:order-2">
                        {recipe.infos?.map((info) => (
                            <div className="relative rounded-3xl bg-white px-4 py-6 text-sm text-text-black md:px-6 md:py-7 md:text-base lg:text-sm xl:text-base">
                                <h3 className="mb-3 text-xl font-bold tracking-wider text-bright-salad uppercase md:text-2xl lg:text-xl xl:text-2xl">
                                    {info.title}
                                </h3>

                                {info.html && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: info.html,
                                        }}
                                    ></div>
                                )}

                                {info.image && (
                                    <>
                                        <LazyImage
                                            parentClass="aspect-video rounded-2xl"
                                            img={info.image.path}
                                            tinyImg={info.image.tiny_path}
                                            alt={info.image.alt}
                                        />
                                        <button
                                            onClick={() => {
                                                if (!info.image) return;
                                                setZoomedImg(info.image);
                                            }}
                                            className="absolute right-2 bottom-2 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full bg-bright-salad sm:top-5 sm:right-5"
                                        >
                                            <ZoomIn className="size-3/4 text-white" />
                                        </button>
                                    </>
                                )}
                            </div>
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
        <div className="mx-auto my-6 flex max-w-75 items-center justify-between text-sm md:my-10 md:max-w-80 md:text-base xl:my-12">
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
                aria-label={`Оценка: ${recipe.rating} из 10`}
            >
                <img
                    src={StarSvg}
                    alt=""
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                <span>{`${recipe.rating}/10`}</span>
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
