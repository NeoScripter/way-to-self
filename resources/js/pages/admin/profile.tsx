import ProfileInfo from '@/components/admin/molecules/profile-info';
import ProfilePassword from '@/components/admin/molecules/profile-password';
import AdminLayout from '@/layouts/admin/admin-layout';
import { formatDate } from '@/lib/helpers/formatDate';
import { Auth } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Profile() {
    const { auth } = usePage<{
        auth: Auth;
    }>().props;

    return (
        <AdminLayout>
            <h3 className="mb-6 text-center text-xl font-bold sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl">
                Личные данные
            </h3>
            <ProfileInfo
                user={auth.user}
                routeName={route('profile.update')}
            />
            <h3 className="mb-6 mt-10 text-center text-xl font-bold sm:mb-8 sm:mt-16 sm:text-2xl lg:mb-10 lg:mt-22 lg:text-3xl">
                Изменение пароля
            </h3>

            <ProfilePassword />

            <p className="mt-10 text-center text-sm font-semibold sm:text-base">
                Дата последнего изменения: {formatDate(auth.user.updated_at)}
            </p>
        </AdminLayout>
    );
}
