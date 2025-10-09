import ProgramUpsert from '@/components/admin/molecules/program-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {

    return (
        <EditingLayout
            navKey="programs"
            title="Создать программу"
        >
            <ProgramUpsert routeName={route(`admin.programs.store`)} />
        </EditingLayout>
    );
}
