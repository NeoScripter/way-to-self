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
import { Practice } from '@/types/model';
import { soulMenuItems } from '../soul-menu-items';


export default function Index() {
    const {
        practices,
        count,
    } = usePage<{
        practices: PaginationMeta<Practice>;
        count: number;
        namespace: string;
    }>().props;

    const [selectedPractice, setSelectedPractice] = useState<Practice | null>(
        null,
    );

    const badge = pluralizeRu(count, 'практика', 'практики', 'практик');

    return (
        <AdminLayout topMenuItems={soulMenuItems}>
            <TableHeader
                only={['practices']}
                label={'все практики'}
                badge={`${count} ${badge}`}
                createRoute={route(`admin.soul.practices.create`)}
            />
            <Table
                meta={practices}
                width="min-w-150 sm:min-w-180 lg:min-w-220 space-y-8"
                columns={['Фото', 'Заголовок', 'Краткое описание', '']}
                isEmpty={practices.data.length === 0}
                columnClass="!text-center"
            >
                {practices.data.map((practice) => (
                    <PracticeItem
                        key={practice.id}
                        practice={practice}
                        onClick={() => setSelectedPractice(practice)}
                    />
                ))}
            </Table>

            {selectedPractice != null && (
                <ConfirmationDialog
                    show={selectedPractice != null}
                    closeDialog={() => setSelectedPractice(null)}
                    title="Вы точно уверены, что хотите удалить данную практику?"
                    routeName={route(
                        `admin.soul.practices.destroy`,
                        selectedPractice,
                    )}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type PracticeItemProps = {
    practice: Practice;
    onClick: () => void;
};

function PracticeItem({ practice, onClick }: PracticeItemProps) {

    return (
        <div
            className={cn(
                'relative grid grid-cols-4 gap-2 text-center text-text-black md:justify-between',
            )}
        >
            <div className="">
                {practice.image && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={practice.image.path}
                        tinyImg={practice.image.tiny_path}
                        alt={practice.image.alt}
                    />
                )}
            </div>
            <span className="pt-4 font-semibold">{practice.title}</span>
            <span className="">{shortenDescription(practice.description)}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route(`admin.soul.practices.show`, practice.id)}
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
