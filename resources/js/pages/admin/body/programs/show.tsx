import ExpandablePanel from '@/components/admin/molecules/expandable-panel';
import ProgramUpsert from '@/components/admin/molecules/program-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Program } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { program } = usePage<{
        program: Program;
    }>().props;

    return (
        <EditingLayout
            navKey="programs"
            updatedAt={program.updated_at}
        >
            <ExpandablePanel label="Редактировать программу">
                <ProgramUpsert
                    program={program}
                    routeName={route(`admin.programs.update`, program.id)}
                />
            </ExpandablePanel>
        </EditingLayout>
    );
}
