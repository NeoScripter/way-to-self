import NavReturn from '@/components/admin/atoms/nav-return';
import ToggleBtn from '@/components/admin/atoms/toggle-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import EditPromo from '@/components/admin/molecules/edit-promo';
import useToggle from '@/hooks/use-toggle';
import AdminLayout from '@/layouts/admin/admin-layout';
import { formatDate } from '@/lib/helpers/formatDate';
import pluralizeRu from '@/lib/helpers/pluralize';
import { Plan } from '@/types/model';
import { TrashIcon } from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';

export default function Show() {
    const { plan, count } = usePage<{
        plan: Plan;
        count: number;
    }>().props;

    const [showModal, toggleModal] = useToggle(false);
    const [showDisableModal, toggleDisableModal] = useToggle(false);

    function handleChange() {
        if (!plan.enabled) {
            router.patch(route('admin.plans.toggle', plan.id));
        } else {
            toggleDisableModal(true);
        }
    }

    const badge = pluralizeRu(count, 'тариф', 'тарифа', 'тарифов');

    return (
        <AdminLayout>
            <NavReturn
                routeName={route('admin.plans.index')}
                badge={`${count} ${badge}`}
                label="список промокодов"
            />

            <h3 className="mt-12 mb-6 text-center text-xl font-bold sm:mt-16 sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl xl:mt-20">
                Редактировать промокод
            </h3>

            <EditPromo
                plan={plan}
                routeName={route('admin.plans.update', plan.id)}
            />

            <div className="my-10 flex flex-col items-center justify-between gap-10 md:my-16 md:flex-row xl:my-20">
                <ToggleBtn
                    color="data-checked:bg-red-700"
                    label={
                        plan.enabled
                            ? 'Промокод активен'
                            : 'Промокод деактивирован'
                    }
                    checked={!plan.enabled}
                    handleChange={handleChange}
                />

                <button
                    onClick={() => toggleModal(true)}
                    className="flex cursor-pointer items-center gap-1 text-red-700 transition-colors duration-200 ease-in hover:text-red-500"
                >
                    <TrashIcon className="size-6" />
                    Удалить
                </button>
            </div>

            {plan.updated_at && (
                <p className="mt-8 text-center text-sm font-semibold sm:text-base">
                    Дата последнего изменения: {formatDate(plan.updated_at)}
                </p>
            )}

            <ConfirmationDialog
                show={showModal}
                closeDialog={() => toggleModal(false)}
                title="Вы точно уверены, что хотите удалить данный промокод?"
                routeName={route('admin.plans.destroy')}
                payload={{ ids: [plan.id] }}
                methodName="delete"
                confirmBtnLabel="Удалить"
                cancelBtnLabel="Отмена"
            />

            <ConfirmationDialog
                show={showDisableModal}
                closeDialog={() => toggleDisableModal(false)}
                title="Вы точно уверены, что хотите деактивировать данный промокод?"
                routeName={route('admin.plans.toggle', plan.id)}
                methodName="patch"
                confirmBtnLabel="Деактивировать"
                cancelBtnLabel="Отмена"
            />
        </AdminLayout>
    );
}
