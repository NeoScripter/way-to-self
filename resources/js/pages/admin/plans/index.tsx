import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import useToggle from '@/hooks/use-toggle';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Plan } from '@/types/model';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { plans, count } = usePage<{
        plans: PaginationMeta<Plan>;
        count: number;
    }>().props;

    const [showDeleteModal, toggleDeleteModal] = useToggle(false);

    const badge = pluralizeRu(count, 'тариф', 'тарифа', 'тарифов');

    return (
        <AdminLayout>
            <TableHeader
                only={['plans']}
                label={'все промокоды'}
                badge={`${count} ${badge}`}
                createRoute={route('admin.plans.create')}
                hasSearch={false}
                hasSorting={false}
            />
            <Table
                meta={plans}
                width="min-w-100 sm:min-w-120 lg:min-w-150"
                columns={['Фото', 'Название', 'Описание', '']}
                isEmpty={plans.data.length === 0}
            >
                {plans.data.map((plan) => (
                    <PlanItem
                        key={plan.id}
                        plan={plan}
                    />
                ))}
            </Table>

            <ConfirmationDialog
                show={showDeleteModal}
                closeDialog={() => toggleDeleteModal(false)}
                title="Вы точно уверены, что хотите удалить все выделенные промокоды?"
                routeName={route('admin.plans.destroy')}
                methodName="delete"
                confirmBtnLabel="Удалить"
                cancelBtnLabel="Отмена"
            />
        </AdminLayout>
    );
}

type PlanItemProps = {
    plan: Plan;
};

function PlanItem({ plan }: PlanItemProps) {
    return (
        <div
            className={cn(
                'relative isolate flex items-center gap-2 text-text-black md:justify-between',
                !plan.enabled && 'text-red-700'
            )}
        >
            <div className="flex w-2/5 items-center gap-1 md:w-3/7 2xl:mr-5">
                <Link
                    href={route('admin.plans.show', plan.id)}
                    className="cursor-pointer text-left underline-offset-4 transition-colors duration-200 ease-in-out hover:text-bright-salad hover:underline"
                    as="button"
                >{`${plan.title}`}</Link>
            </div>
            <span className="mr-10 lg:mr-0">TODO</span>
            <span className="ml-auto text-right">
                TODO
            </span>
        </div>
    );
}
