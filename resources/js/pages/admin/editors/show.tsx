import ToggleBtn from '@/components/admin/atoms/toggle-btn';
import TrashBtn from '@/components/admin/atoms/trash-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ProfileInfo from '@/components/admin/molecules/profile-info';
import useToggle from '@/hooks/use-toggle';
import EditingLayout from '@/layouts/admin/editing-layout';
import { User } from '@/types';
import { router, usePage } from '@inertiajs/react';

export default function Show() {
    const { user } = usePage<{
        user: User;
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

    return (
        <EditingLayout
            navKey="editors"
            title="Редактировать данные редактора"
            updatedAt={user.updated_at}
        >

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

                <TrashBtn
                    onClick={() => toggleModal(true)}
                    label="Удалить"
                />
            </div>

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
        </EditingLayout>
    );
}
