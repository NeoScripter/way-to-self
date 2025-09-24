import ProfileInfo from '@/components/admin/molecules/profile-info';
import AdminLayout from '@/layouts/admin/admin-layout';
import { formatDate } from '@/lib/helpers/formatDate';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { user } = usePage<{
        user: User;
    }>().props;

    return (
        <AdminLayout>
            <h3 className="mb-6 text-center text-xl font-bold sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl">
                Редактировать данные редактора
            </h3>
            <ProfileInfo
                user={user}
                routeName={route('profile.update')}
            />
            <p className="mt-8 text-center text-sm font-semibold sm:text-base">
                Дата последнего изменения: {formatDate(user.updated_at)}
            </p>
        </AdminLayout>
    );
}
