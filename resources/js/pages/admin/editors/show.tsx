import NavReturn from '@/components/admin/atoms/nav-return';
import ToggleBtn from '@/components/admin/atoms/toggle-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ProfileInfo from '@/components/admin/molecules/profile-info';
import useToggle from '@/hooks/use-toggle';
import AdminLayout from '@/layouts/admin/admin-layout';
import { formatDate } from '@/lib/helpers/formatDate';
import pluralizeRu from '@/lib/helpers/pluralize';
import { User } from '@/types';
import { TrashIcon } from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';

export default function Show() {
    const { user, count } = usePage<{
        user: User;
        count: number;
    }>().props;

    const [showModal, toggleModal] = useToggle(false);
    const [showDisableModal, toggleDisableModal] = useToggle(false);

    function handleChange() {
        if (user.banned) {
            router.post(route('admin.editors.ban', user.id));
        } else {
            toggleDisableModal(true);
        }
    }

    const badge = pluralizeRu(count, 'аккаунт', 'аккаунта', 'аккаунтов');

    return (
        <AdminLayout>
            <NavReturn
                routeName={route('admin.editors.index')}
                badge={`${count} ${badge}`}
                label="список админов"
            />

            <h3 className="mt-12 mb-6 text-center text-xl font-bold sm:mt-16 sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl xl:mt-20">
                Редактировать данные редактора
            </h3>

            <ProfileInfo
                user={user}
                routeName={route('admin.editors.update', user.id)}
            />

            <div className="my-10 flex flex-col items-center justify-between gap-10 md:my-16 md:flex-row xl:my-20">
                <ToggleBtn
                    color="data-checked:bg-red-700"
                    label={
                        user.banned
                            ? 'Пользователь заблокирован'
                            : 'Пользователь активен'
                    }
                    handleChange={handleChange}
                    checked={user.banned}
                />

                <button
                    onClick={() => toggleModal(true)}
                    className="flex cursor-pointer items-center gap-1 text-red-700 transition-colors duration-200 ease-in hover:text-red-500"
                >
                    <TrashIcon className="size-6" />
                    Удалить
                </button>
            </div>

            <p className="mt-8 text-center text-sm font-semibold sm:text-base">
                Дата последнего изменения: {formatDate(user.updated_at)}
            </p>

            <ConfirmationDialog
                show={showModal}
                closeDialog={() => toggleModal(false)}
                title="Вы точно уверены, что хотите удалить данного пользователя?"
                description="Восстановление данного пользователя будет невозможно"
                routeName={route('admin.editors.destroy', user.id)}
                methodName="delete"
                confirmBtnLabel="Удалить"
                cancelBtnLabel="Отмена"
            />

            <ConfirmationDialog
                show={showDisableModal}
                closeDialog={() => toggleDisableModal(false)}
                title="Вы точно уверены, что хотите заблокировать данного пользователя?"
                description="После блокировки пользователь не сможет больше войти в аккаунт"
                routeName={route('admin.editors.ban', user.id)}
                methodName="post"
                confirmBtnLabel="Заблокировать"
                cancelBtnLabel="Отмена"
            />
        </AdminLayout>
    );
}
