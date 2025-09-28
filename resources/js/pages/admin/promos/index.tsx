import CheckboxSolid from '@/components/admin/atoms/checkbox-solid';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import useToggle from '@/hooks/use-toggle';
import AdminLayout from '@/layouts/admin/admin-layout';
import { formatDate } from '@/lib/helpers/formatDate';
import pluralizeRu from '@/lib/helpers/pluralize';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Promo } from '@/types/model';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
    const { promos, count } = usePage<{
        promos: PaginationMeta<Promo>;
        count: number;
    }>().props;

    const [selected, setSelected] = useState<number[]>([]);
    const [showDeleteModal, toggleDeleteModal] = useToggle(false);

    function handleChange(id: number) {
        if (selected.includes(id)) {
            setSelected((p) => p.filter((n) => n !== id));
        } else {
            setSelected((p) => [...p, id]);
        }
    }

    const allSelected = selected.length === promos.data.length;

    function handleSelectAll() {
        if (allSelected) {
            setSelected([]);
        } else {
            setSelected(promos.data.map((p) => p.id));
        }
    }

    const badge = pluralizeRu(count, 'промокод', 'промокода', 'промокодов');

    return (
        <AdminLayout>
            <TableHeader
                only={['promos']}
                label={'все промокоды'}
                badge={`${count} ${badge}`}
                createRoute={route('admin.promos.create')}
            />
            <div className="mt-9 mb-3 flex items-center gap-3">
                <button
                    onClick={handleSelectAll}
                    className="ease transition-outline flex cursor-pointer items-center rounded-md border-2 border-slate-200 bg-white px-1 py-0.5 pb-1 text-xs text-slate-400 shadow-sm outline-slate-200/60 duration-100 hover:outline-3 focus:shadow focus:outline-3 focus:outline-none sm:order-0"
                >
                    {allSelected ? 'очистить' : 'выбрать все'}
                </button>
                {selected.length > 0 && (
                    <button
                        onClick={() => toggleDeleteModal(true)}
                        className="flex cursor-pointer items-center gap-1 text-red-700 transition-colors duration-200 ease-in hover:text-red-500"
                    >
                        <TrashIcon className="size-5" />
                    </button>
                )}
            </div>
            <Table
                meta={promos}
                width="min-w-100 sm:min-w-120 lg:min-w-150 mt-0"
                columns={['Промокод', 'Скидка', 'Срок действия']}
                isEmpty={promos.data.length === 0}
            >
                {promos.data.map((promo) => (
                    <PromoItem
                        key={promo.id}
                        promo={promo}
                        selected={selected.includes(promo.id)}
                        onChange={handleChange}
                    />
                ))}
            </Table>

            <ConfirmationDialog
                show={showDeleteModal}
                closeDialog={() => toggleDeleteModal(false)}
                title="Вы точно уверены, что хотите удалить все выделенные промокоды?"
                routeName={route('admin.promos.destroy')}
                payload={{ ids: selected }}
                methodName="delete"
                confirmBtnLabel="Удалить"
                cancelBtnLabel="Отмена"
            />
        </AdminLayout>
    );
}

type PromoItemProps = {
    promo: Promo;
    selected: boolean;
    onChange: (arg: number) => void;
};

function PromoItem({ promo, selected, onChange }: PromoItemProps) {
    return (
        <div
            className={cn(
                'relative isolate flex items-center gap-2 px-2 text-text-black md:justify-between',
                !promo.enabled && 'text-red-700',
                selected && 'text-bright-salad',
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'linear absolute -inset-1 right-0 left-0 -z-1 rounded-sm bg-transparent-gray opacity-0 transition-opacity duration-200',
                    selected && 'opacity-100',
                )}
            ></span>
            <div className="flex w-2/5 items-center gap-1 md:w-3/7 2xl:mr-5">
                <CheckboxSolid
                    checked={selected}
                    onChange={() => onChange(promo.id)}
                    checkboxClassName="mr-1"
                />
                <Link
                    href={route('admin.promos.show', promo.id)}
                    className="cursor-pointer text-left underline-offset-4 transition-colors duration-200 ease-in-out hover:text-bright-salad hover:underline"
                    as="button"
                >{`${promo.name}`}</Link>
            </div>
            <span className="mr-10 lg:mr-0">{`${promo.discount} ${promo.discount_type === 'percent' ? '%' : 'руб.'}`}</span>
            <span className="ml-auto text-right">
                {`До ${formatDate(promo.expires_at)}`}
            </span>
        </div>
    );
}
