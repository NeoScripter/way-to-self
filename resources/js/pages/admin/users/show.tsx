import ToggleBtn from '@/components/admin/atoms/toggle-btn';
import TrashBtn from '@/components/admin/atoms/trash-btn';
import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import ProfileInfo from '@/components/admin/molecules/profile-info';
import useToggle from '@/hooks/use-toggle';
import EditingLayout from '@/layouts/admin/editing-layout';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

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
    const { user } = usePage<{ user: User }>().props;

    const [extendTierId, setExtendTierId] = useState<string | null>(null);
    const [reduceTierId, setReduceTierId] = useState<string | null>(null);

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
                    <span className="w-min px-2">
                        <span
                            className={cn(
                                'flex items-center gap-1',
                                idx === 0 && 'pointer-events-none opacity-0',
                            )}
                        >
                            {idx > 0 ? (
                                <button
                                    type="button"
                                    onClick={() => setExtendTierId(column.id)}
                                    className="cursor-pointer rounded-sm bg-bright-salad p-0.5 text-white transition-[colors,transform] hover:scale-103 hover:bg-bright-salad/80"
                                >
                                    <Plus />
                                </button>
                            ) : (
                                <span className="block size-7" />
                            )}
                            {idx > 0 ? (
                                <button
                                    type="button"
                                    onClick={() => setReduceTierId(column.id)}
                                    className="cursor-pointer rounded-sm p-0.5 shadow-sm transition-[colors,transform] hover:scale-103"
                                >
                                    <Minus />
                                </button>
                            ) : (
                                <span className="block size-7" />
                            )}
                        </span>
                    </span>
                    <span className="w-full">{column.title}</span>
                    <span className="hidden w-full xs:inline">
                        {column.start}
                    </span>
                    <span className="w-full">{column.end}</span>
                </div>
            ))}

            {extendTierId !== null && (
                <ConfirmationDialog
                    show={extendTierId !== null}
                    closeDialog={() => setExtendTierId(null)}
                    title="Вы точно уверены, что хотите продлить подписку данного пользователя?"
                    description="Подписка данного пользователя будет продлена на год"
                    routeName={route('admin.user-tier.store', {
                        user: user.id,
                        tierId: extendTierId,
                    })}
                    methodName="post"
                    confirmBtnLabel="Продлить"
                    cancelBtnLabel="Отмена"
                    confirmBtnClass="bg-dark-swamp hover:bg-dark-swamp/80"
                />
            )}

            {reduceTierId !== null && (
                <ConfirmationDialog
                    show={reduceTierId !== null}
                    closeDialog={() => setReduceTierId(null)}
                    title="Вы точно уверены, что хотите сократить подписку данного пользователя?"
                    description="Подписка будет сокращена на год, либо удалена, если срок ее окончания меньше года"
                    routeName={route('admin.user-tier.destroy', {
                        user: user.id,
                        tierId: reduceTierId,
                    })}
                    methodName="delete"
                    confirmBtnLabel="Сократить"
                    cancelBtnLabel="Отмена"
                />
            )}
        </>
    );
}

export default function Show() {
    const { user, columns } = usePage<{
        user: User;
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

    return (
        <EditingLayout
            navKey="users"
            title="Личные данные пользователя"
            updatedAt={user.updated_at}
        >
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
        </EditingLayout>
    );
}
