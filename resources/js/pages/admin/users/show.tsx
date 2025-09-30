import NavReturn from '@/components/admin/atoms/nav-return';
import ToggleBtn from '@/components/admin/atoms/toggle-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ProfileInfo from '@/components/admin/molecules/profile-info';
import useToggle from '@/hooks/use-toggle';
import AdminLayout from '@/layouts/admin/admin-layout';
import { formatDate } from '@/lib/helpers/formatDate';
import pluralizeRu from '@/lib/helpers/pluralize';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { TrashIcon } from '@heroicons/react/24/solid';
import { router, usePage } from '@inertiajs/react';

type Column = {
    id: string;
    title: string;
    start: string;
    end: string;
};

type TierTableProps = {
    columns: Column[];
};

function TierTable({ columns }: TierTableProps) {
    return (
        <>
            {columns.map((column, idx) => (
                <div
                    key={column.id}
                    className={cn(
                        'flex items-center justify-between rounded-md border border-slate-300 px-1 py-3 text-center text-xs sm:text-sm md:text-base',
                        idx === 0 && 'text-slate-400',
                    )}
                >
                    <span className="w-full">{column.title}</span>
                    <span className="w-full">{column.start}</span>
                    <span className="w-full">{column.end}</span>
                </div>
            ))}
        </>
    );
}

export default function Show() {
    const { user, count, columns } = usePage<{
        user: User;
        count: number;
        columns: Column[] | undefined;
    }>().props;

    const isDeleted = user.deleted_at != null;
    const [showModal, toggleModal] = useToggle(false);
    const [showDisableModal, toggleDisableModal] = useToggle(false);

    function handleChange() {
        if (isDeleted) {
            toggleDisableModal(true);
        } else if (user.banned) {
            router.post(route('admin.users.ban', user.id));
        } else {
            toggleDisableModal(true);
        }
    }

    const badge = pluralizeRu(count, 'аккаунт', 'аккаунта', 'аккаунтов');

    return (
        <AdminLayout>
            <NavReturn
                routeName={route('admin.users.index')}
                badge={`${count} ${badge}`}
                label="список пользователей"
            />

            <h3 className="mt-12 mb-6 text-center text-xl font-bold sm:mt-16 sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl xl:mt-20">
                Личные данные пользователя
            </h3>

            <ProfileInfo
                user={user}
                routeName={route('admin.users.update', user.id)}
            />

            {columns != null && (
                <div className="my-10 space-y-1 md:my-16 xl:my-20">
                    <TierTable columns={columns} />
                </div>
            )}

            <div className="my-10 flex flex-col items-center justify-between gap-10 md:my-16 md:flex-row xl:my-20">
                {isDeleted ? (
                    <ToggleBtn
                        color="data-checked:bg-orange-500"
                        label="Восстановить пользователя"
                        checked={isDeleted}
                        handleChange={handleChange}
                    />
                ) : (
                    <ToggleBtn
                        color="data-checked:bg-red-700"
                        label={
                            user.banned
                                ? 'Пользователь заблокирован'
                                : 'Пользователь активен'
                        }
                        checked={user.banned}
                        handleChange={handleChange}
                    />
                )}

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
                routeName={route('admin.users.destroy', user.id)}
                methodName="delete"
                confirmBtnLabel="Удалить"
                cancelBtnLabel="Отмена"
            />

            {isDeleted ? (
                <ConfirmationDialog
                    show={showDisableModal}
                    closeDialog={() => toggleDisableModal(false)}
                    title="Вы точно уверены, что хотите восстановить аккаунт данного пользователя?"
                    routeName={route('admin.users.restore', user.id)}
                    methodName="post"
                    confirmBtnLabel="Восстановить"
                    cancelBtnLabel="Отмена"
                />
            ) : (
                <ConfirmationDialog
                    show={showDisableModal}
                    closeDialog={() => toggleDisableModal(false)}
                    title="Вы точно уверены, что хотите заблокировать данного пользователя?"
                    description="После блокировки пользователь не сможет больше войти в аккаунт"
                    routeName={route('admin.users.ban', user.id)}
                    methodName="post"
                    confirmBtnLabel="Заблокировать"
                    cancelBtnLabel="Отмена"
                />
            )}
        </AdminLayout>
    );
}
