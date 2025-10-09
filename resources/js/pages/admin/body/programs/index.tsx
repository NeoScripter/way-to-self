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
import { Program } from '@/types/model';
import { bodyMenuItems } from '../body-menu-items';


export default function Index() {
    const {
        programs,
        count,
    } = usePage<{
        programs: PaginationMeta<Program>;
        count: number;
        namespace: string;
    }>().props;

    const [selectedProgram, setSelectedProgram] = useState<Program | null>(
        null,
    );

    const badge = pluralizeRu(count, 'программа', 'программы', 'программ');

    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <TableHeader
                only={['programs']}
                label={'все программы'}
                badge={`${count} ${badge}`}
                createRoute={route(`admin.programs.create`)}
            />
            <Table
                meta={programs}
                width="min-w-150 sm:min-w-180 lg:min-w-220 space-y-8"
                columns={['Фото', 'Заголовок', 'Краткое описание', '']}
                isEmpty={programs.data.length === 0}
                columnClass="!text-center"
            >
                {programs.data.map((program) => (
                    <ProgramItem
                        key={program.id}
                        program={program}
                        onClick={() => setSelectedProgram(program)}
                    />
                ))}
            </Table>

            {selectedProgram != null && (
                <ConfirmationDialog
                    show={selectedProgram != null}
                    closeDialog={() => setSelectedProgram(null)}
                    title="Вы точно уверены, что хотите удалить данную программу?"
                    routeName={route(
                        `admin.programs.destroy`,
                        selectedProgram,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type ProgramItemProps = {
    program: Program;
    onClick: () => void;
};

function ProgramItem({ program, onClick }: ProgramItemProps) {

    return (
        <div
            className={cn(
                'relative grid grid-cols-4 gap-2 text-center text-text-black md:justify-between',
            )}
        >
            <div className="">
                {program.image && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={program.image.path}
                        tinyImg={program.image.tiny_path}
                        alt={program.image.alt}
                    />
                )}
            </div>
            <span className="pt-4 font-semibold">{program.title}</span>
            <span className="">{shortenDescription(program.description)}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route(`admin.programs.show`, program.id)}
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
