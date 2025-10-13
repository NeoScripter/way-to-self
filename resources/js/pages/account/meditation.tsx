import EntityHeader from '@/components/account/molecules/entity-header';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
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
                    className="mt-7 sm:mt-11 md:mt-15 xl:mt-18"
                    itemName={`Медитация №${audio.id}`}
                    labels={labels}
                />
                <EntityHeader
                    title={audio.title}
                    description={audio.description}
                    isFavorite={isFavorite}
                    favoriteRoute={route('soul.audios.favorite', audio.id)}
                />
                {audio && (
                    <AudioPlayer
                        showTitle={false}
                        className="relative z-11 my-6 mb-10 bg-card-backdrop-gray sm:mt-40 sm:mb-15 lg:mb-20"
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
