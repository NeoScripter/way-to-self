import EntityHeader from '@/components/account/molecules/entity-header';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
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
                    className="mt-7 sm:mt-11 md:mt-15 xl:mt-18"
                    itemName={`Практика №${practice.id}`}
                    labels={labels}
                />

                <EntityHeader
                    title={practice.title}
                    isFavorite={isFavorite}
                    favoriteRoute={route(
                        'soul.practices.favorite',
                        practice.id,
                    )}
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
