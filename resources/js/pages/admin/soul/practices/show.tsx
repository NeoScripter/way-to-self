import PracticeUpsert from '@/components/admin/molecules/practice-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Practice } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { practice } = usePage<{
        practice: Practice;
    }>().props;

    return (
        <EditingLayout
            navKey="practices"
            title="Редактировать практику"
            updatedAt={practice.updated_at}
        >
            <PracticeUpsert
                practice={practice}
                routeName={route(`admin.soul.practices.update`, practice.id)}
            />
        </EditingLayout>
    );
}
