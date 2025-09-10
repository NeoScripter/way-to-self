import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LikeBtn from '@/components/shared/atoms/like-btn';
import AudioPlayer from '@/components/user/atoms/audio-player';
import AppLayout from '@/layouts/user/app-layout';
import { Audio as AudioType } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Meditation() {
    const { audio, isFavorite, labels } = usePage<{
        audio: AudioType;
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
                    itemName={`Медитация №${audio.id}`}
                    labels={labels}
                />
                <h1 className="text-center lg:mb-18 font-heading text-2xl font-medium text-balance text-text-black uppercase md:text-5xl xl:text-6xl">
                    {audio.title}
                </h1>

                <LikeBtn
                    className="mx-auto mt-4 md:mt-8 lg:absolute lg:top-0 lg:right-0 lg:mt-0"
                    route={route('soul.audios.favorite', audio.id)}
                    isFavorite={isFavorite}
                />

                {audio && (
                    <AudioPlayer
                        showTitle={false}
                        className="relative z-11 my-6 sm:mt-40 mb-10 sm:mb-15 lg:mb-20 bg-card-backdrop-gray"
                    />
                )}

                <div
                    className="prose prose-sm mb-43 max-w-full prose-neutral md:prose-base md:mb-47 xl:prose-xl xl:mb-63"
                    dangerouslySetInnerHTML={{ __html: audio.html }}
                ></div>
            </article>
        </AppLayout>
    );
}
