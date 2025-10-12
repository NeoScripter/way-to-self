import AudioUpsert from '@/components/admin/molecules/audio-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Audio } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { audio } = usePage<{
        audio: Audio;
    }>().props;

    return (
        <EditingLayout
            navKey="audios"
            title="Редактировать медитацию"
            updatedAt={audio.updated_at}
        >
            <AudioUpsert
                audio={audio}
                routeName={route(`admin.soul.audios.update`, audio.id)}
            />
        </EditingLayout>
    );
}
