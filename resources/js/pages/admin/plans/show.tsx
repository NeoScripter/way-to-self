import ToggleBtn from '@/components/admin/atoms/toggle-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import PlanUpsert from '@/components/admin/molecules/plan-upsert';
import useToggle from '@/hooks/use-toggle';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Plan } from '@/types/model';
import { router, usePage } from '@inertiajs/react';

export default function Show() {
    const { plan } = usePage<{
        plan: Plan;
    }>().props;

    const [showDisableModal, toggleDisableModal] = useToggle(false);

    function handleChange() {
        if (!plan.enabled) {
            router.patch(
                route('admin.plans.toggle', plan.id),
                {},
                {
                    preserveScroll: true,
                },
            );
        } else {
            toggleDisableModal(true);
        }
    }

    return (
        <EditingLayout
            navKey="plans"
            title="Редактировать тариф"
            updatedAt={plan.updated_at}
        >
            <div className="my-10 flex flex-col items-center justify-between gap-10 md:my-16 md:flex-row xl:my-20">
                <ToggleBtn
                    color="data-checked:bg-red-700"
                    label={
                        plan.enabled ? 'Тариф активен' : 'Тариф деактивирован'
                    }
                    checked={!plan.enabled}
                    handleChange={handleChange}
                />
            </div>

            <PlanUpsert
                plan={plan}
                routeName={route('admin.plans.update', plan.id)}
            />
            <ConfirmationDialog
                show={showDisableModal}
                closeDialog={() => toggleDisableModal(false)}
                title="Вы точно уверены, что хотите деактивировать данный тариф?"
                routeName={route('admin.plans.toggle', plan.id)}
                methodName="patch"
                confirmBtnLabel="Деактивировать"
                cancelBtnLabel="Отмена"
            />
        </EditingLayout>
    );
}
