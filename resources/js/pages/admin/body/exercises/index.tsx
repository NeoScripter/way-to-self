import TrashBtn from '@/components/admin/atoms/trash-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import LazyImage from '@/components/user/atoms/lazy-image';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { shortenDescription } from '@/lib/helpers/shortenDescription';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { bodyMenuItems } from '../body-menu-items';
import { Exercise } from '@/types/model';


export default function Index() {
    const {
        exercises,
        count,
    } = usePage<{
        exercises: PaginationMeta<Exercise>;
        count: number;
        namespace: string;
    }>().props;

    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
        null,
    );

    const badge = pluralizeRu(count, 'упражнение', 'упражнения', 'упражнений');

    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <TableHeader
                only={['exercises']}
                label={'все упражнения'}
                badge={`${count} ${badge}`}
                createRoute={route(`admin.exercises.create`)}
            />
            <Table
                meta={exercises}
                width="min-w-150 sm:min-w-180 lg:min-w-220 space-y-8"
                columns={['Фото', 'Заголовок', 'Краткое описание', '']}
                isEmpty={exercises.data.length === 0}
                columnClass="!text-center"
            >
                {exercises.data.map((exercise) => (
                    <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        onClick={() => setSelectedExercise(exercise)}
                    />
                ))}
            </Table>

            {selectedExercise != null && (
                <ConfirmationDialog
                    show={selectedExercise != null}
                    closeDialog={() => setSelectedExercise(null)}
                    title="Вы точно уверены, что хотите удалить данное упражнение?"
                    routeName={route(
                        `admin.exercises.destroy`,
                        selectedExercise,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type ExerciseItemProps = {
    exercise: Exercise;
    onClick: () => void;
};

function ExerciseItem({ exercise, onClick }: ExerciseItemProps) {

    return (
        <div
            className={cn(
                'relative grid grid-cols-4 gap-2 text-center text-text-black md:justify-between',
            )}
        >
            <div className="">
                {exercise.image && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={exercise.image.path}
                        tinyImg={exercise.image.tiny_path}
                        alt={exercise.image.alt}
                    />
                )}
            </div>
            <span className="pt-4 font-semibold">{exercise.title}</span>
            <span className="">{shortenDescription(exercise.description)}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route(`admin.exercises.show`, exercise.id)}
                    className="ease cursor-pointer text-dark-green transition-colors duration-200 hover:text-light-swamp"
                    as="button"
                >
                    <PencilIcon className="size-6" />
                </Link>
                <TrashBtn
                    onClick={onClick}
                    size="size-7"
                />
            </div>
        </div>
    );
}
