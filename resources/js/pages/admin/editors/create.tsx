import NavReturn from '@/components/admin/atoms/nav-return';
import CreateUserForm from '@/components/admin/molecules/create-user-form';
import AdminLayout from '@/layouts/admin/admin-layout';
import { usePage } from '@inertiajs/react';

export default function Create() {
    const { count } = usePage<{
        count: number;
    }>().props;

    return (
        <AdminLayout>
            <NavReturn
                routeName={route('admin.editors.index')}
                badge={`${count} аккаунтов`}
                label="список админов"
            />

            <h3 className="mt-12 mb-6 text-center text-xl font-bold sm:mt-16 sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl xl:mt-20">
                Создать редактора
            </h3>

            <CreateUserForm
                routeName={route('admin.editors.store')}
            />
        </AdminLayout>
    );
}

