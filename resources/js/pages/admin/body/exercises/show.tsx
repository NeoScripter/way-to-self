import ExerciseUpsert from '@/components/admin/molecules/exercise-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Exercise } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { exercise } = usePage<{
        exercise: Exercise;
    }>().props;

    return (
        <EditingLayout
            navKey="exercises"
            title="Редактировать упражнение"
            updatedAt={exercise.updated_at}
        >
            <ExerciseUpsert
                exercise={exercise}
                routeName={route(`admin.exercises.update`, exercise.id)}
            />
        </EditingLayout>
    );
}
