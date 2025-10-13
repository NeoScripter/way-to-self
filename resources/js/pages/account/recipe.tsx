import EntityHeader from '@/components/account/molecules/entity-header';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LazyImage from '@/components/user/atoms/lazy-image';
import LightBox from '@/components/user/molecules/light-box';
import RecipeInfo from '@/components/user/molecules/recipe-info';
import RecipeStats from '@/components/user/molecules/recipe-stats';
import VideoPlayer from '@/components/user/molecules/video-player';
import AppLayout from '@/layouts/user/app-layout';
import { cn } from '@/lib/utils';
import { Image, Recipe as RecipeType } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Recipe() {
    const { recipe, video, isFavorite } = usePage<{
        recipe: RecipeType;
        video: string;
        isFavorite: boolean;
    }>().props;

    const [zoomedImg, setZoomedImg] = useState<Image | null>(null);

    const handleClick = (image: Image | undefined) => {
        if (!image) return;

        setZoomedImg(image);
    };

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
                    itemName={`Рецепт №${recipe.id}`}
                    labels={['Главная', 'Питание', 'Рецепты']}
                />

                <EntityHeader
                    title={recipe.title}
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
