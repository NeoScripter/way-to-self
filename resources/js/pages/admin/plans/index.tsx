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
import { Plan } from '@/types/model';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
    const { plans, count } = usePage<{
        plans: PaginationMeta<Plan>;
        count: number;
    }>().props;

    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const badge = pluralizeRu(count, 'тариф', 'тарифа', 'тарифов');

    return (
        <AdminLayout>
            <TableHeader
                only={['plans']}
                label={'все тарифы'}
                badge={`${count} ${badge}`}
                createRoute={route('admin.plans.create')}
                hasSearch={false}
                hasSorting={false}
            />
            <Table
                meta={plans}
                width="min-w-150 sm:min-w-180 lg:min-w-220 space-y-8"
                columns={['Фото', 'Название', 'Описание', '']}
                isEmpty={plans.data.length === 0}
                columnClass="!text-center"
            >
                {plans.data.map((plan) => (
                    <PlanItem
                        key={plan.id}
                        plan={plan}
                        onClick={() => setSelectedPlan(plan)}
                    />
                ))}
            </Table>

            {selectedPlan != null && (
                <ConfirmationDialog
                    show={selectedPlan != null}
                    closeDialog={() => setSelectedPlan(null)}
                    title="Вы точно уверены, что хотите удалить данный тариф?"
                    routeName={route('admin.plans.destroy', selectedPlan)}
                    methodName="delete"
                    confirmBtnLabel="Удалить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}

type PlanItemProps = {
    plan: Plan;
    onClick: () => void;
};

function PlanItem({ plan, onClick }: PlanItemProps) {
    return (
        <div
            className={cn(
                'relative grid grid-cols-4 gap-2 text-center text-text-black md:justify-between',
                !plan.enabled && 'text-red-700',
            )}
        >
            <Link
                href={route('admin.plans.show', plan.id)}
                className="transition-scale block cursor-pointer duration-200 hover:scale-105"
                as="button"
            >
                {plan.image && (
                    <LazyImage
                        parentClass="max-w-25 mx-auto"
                        img={plan.image.path}
                        tinyImg={plan.image.tiny_path}
                        alt={plan.image.alt}
                    />
                )}
            </Link>

            <span className="pt-4 font-semibold">{plan.title}</span>
            <span className="">{shortenDescription(plan.description)}</span>
            <div className="flex items-center justify-end gap-2">
                <Link
                    href={route('admin.plans.show', plan.id)}
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
