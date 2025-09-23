import Table from '@/components/admin/orgamisms/table';
import AdminLayout from '@/layouts/admin/admin-layout';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { editors } = usePage<{
        editors: User[];
    }>().props;

    return (
        <AdminLayout>
            <Table createRoute={route('admin.editors.create')} />
        </AdminLayout>
    );
}
