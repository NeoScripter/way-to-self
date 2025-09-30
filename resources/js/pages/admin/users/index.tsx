import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { users, count } = usePage<{
        users: PaginationMeta<User>;
        count: number;
    }>().props;

    const badge = pluralizeRu(count, 'аккаунт', 'аккаунта', 'аккаунтов');

    return (
        <AdminLayout>
            <TableHeader
                only={['users']}
                label={'все пользователи'}
                badge={`${count} ${badge}`}
            />
            <Table
                meta={users}
                width="min-w-150 sm:min-w-190 lg:min-w-220"
                columns={['Имя пользователя', 'Email', 'Телеграм', 'Статус']}
                isEmpty={users.data.length === 0}
            >
                {users.data.map((user) => (
                    <UserItem
                        key={user.id}
                        user={user}
                    />
                ))}
            </Table>
        </AdminLayout>
    );
}

type UserItemProps = {
    user: User;
};

function UserItem({ user }: UserItemProps) {
    const isDeleted = user.deleted_at != null;

    return (
        <div
            className={cn(
                'flex items-center gap-2 text-text-black md:justify-between',
                isDeleted ? 'text-orange-500' : user.banned && 'text-red-700',
            )}
        >
            <div className="w-2/7">
                <Link
                    href={route('admin.users.show', user.id)}
                    className="cursor-pointer text-left underline-offset-4 transition-colors duration-200 ease-in-out hover:text-bright-salad hover:underline"
                    as="button"
                >{`${user.name} ${user.surname}`}</Link>
            </div>
            <span className="w-2/7">{user.email}</span>
            <span className="">{user.telegram}</span>
            <span className="ml-auto text-right">
                {isDeleted ? 'Удален' : user.banned ? 'Заблокирован' : 'Активен'}
            </span>
        </div>
    );
}
