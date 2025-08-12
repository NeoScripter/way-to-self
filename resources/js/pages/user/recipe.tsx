import DishSvg from '@/assets/svgs/dish-black.svg';
import StarSvg from '@/assets/svgs/star-black.svg';
import ClockSvg from '@/assets/svgs/time-black.svg';
import LazyImage from '@/components/user/atoms/lazy-image';
import VideoPlayer from '@/components/user/molecules/video-player';
import UserLayout from '@/layouts/user/user-layout';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { Recipe as RecipeType } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Recipe() {
    const { recipe, video } = usePage<{ recipe: RecipeType; video: string }>()
        .props;

    const roundedDuration = roundDuration(recipe.cooking_time);

    return (
        <UserLayout
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <h1 className="mt-10 text-center font-heading text-2xl font-medium text-balance text-text-black uppercase sm:text-3xl md:mt-20 md:text-5xl xl:text-6xl">
                    {recipe.title}
                </h1>

                <p className="mt-6 text-center text-sm text-pretty text-gray-dark md:mt-12 sm:text-base md:text-lg xl:text-xl">
                    {recipe.description}
                </p>

                <div className="mx-auto max-w-75 my-6 flex text-sm items-center justify-between md:my-10 md:text-base md:max-w-80 xl:my-12">
                    <div
                        className="flex items-center gap-1 md:gap-2"
                        aria-label={`${recipe.cooking_time} минут`}
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
                        {recipe.category && (
                            <span>
                                {recipe.category.name}
                            </span>
                        )}
                    </div>
                </div>

                {video && <VideoPlayer src={video} />}

                <div className="prose prose-sm mb-43 max-w-full prose-neutral md:prose-base md:mb-47 xl:prose-xl xl:mb-63">
                    {recipe.steps?.map((step) => (
                        <div
                            key={step.id}
                            className=""
                        >
                            {step.image && (
                                <LazyImage
                                    parentClass="my-10 aspect-video rounded-2xl"
                                    img={step.image.path}
                                    tinyImg={step.image.tiny_path}
                                    alt={step.image.alt}
                                />
                            )}
                            <div
                                dangerouslySetInnerHTML={{ __html: step.html }}
                            ></div>
                        </div>
                    ))}
                </div>
            </article>
        </UserLayout>
    );
}
