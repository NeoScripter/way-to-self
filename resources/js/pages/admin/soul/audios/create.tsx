import AudioUpsert from '@/components/admin/molecules/audio-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {
    return (
        <EditingLayout
            navKey="audios"
            title="Создать медитацию"
        >
            <AudioUpsert routeName={route(`admin.soul.audios.store`)} />
        </EditingLayout>
    );
}
