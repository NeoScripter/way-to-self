import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LikeBtn from '@/components/shared/atoms/like-btn';
import VideoPlayer from '@/components/user/molecules/video-player';
import AppLayout from '@/layouts/user/app-layout';
import { Practice as PracticeType } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Practice() {
    const { practice, isFavorite, video, labels } = usePage<{
        practice: PracticeType;
        video: string;
        isFavorite: boolean;
        labels: string[];
    }>().props;

    return (
        <AppLayout
            variant="tier"
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
        >
            <article className="relative mx-auto max-w-330">
                <Breadcrumbs
                    className="my-7 sm:my-11 md:my-15 xl:my-18"
                    itemName={`Практика №${practice.id}`}
                    labels={labels}
                />
                <h1 className="text-center lg:mb-18 font-heading text-2xl font-medium text-balance text-text-black uppercase md:text-5xl xl:text-6xl">
                    {practice.title}
                </h1>

                <LikeBtn
                    className="mx-auto mt-4 md:mt-8 lg:absolute lg:top-0 lg:right-0 lg:mt-0"
                    route={route('soul.practices.favorite', practice.id)}
                    isFavorite={isFavorite}
                />

                {video && (
                    <VideoPlayer
                        src={video}
                        className="my-10 block md:my-12 xl:my-15"
                    />
                )}

                <div
                    className="prose prose-sm mb-43 max-w-full prose-neutral md:prose-base md:mb-47 xl:prose-xl xl:mb-63"
                    dangerouslySetInnerHTML={{ __html: practice.html }}
                ></div>
            </article>
        </AppLayout>
    );
}
