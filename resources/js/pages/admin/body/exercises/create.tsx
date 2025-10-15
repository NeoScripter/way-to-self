import ExerciseUpsert from '@/components/admin/molecules/exercise-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {
    return (
        <EditingLayout
            navKey="exercises"
            title="Создать упражнение"
        >
            <ExerciseUpsert routeName={route(`admin.body.exercises.store`)} />
        </EditingLayout>
    );
}
