import PracticeUpsert from '@/components/admin/molecules/practice-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {
    return (
        <EditingLayout
            navKey="practices"
            title="Создать практику"
        >
            <PracticeUpsert routeName={route(`admin.soul.practices.store`)} />
        </EditingLayout>
    );
}
