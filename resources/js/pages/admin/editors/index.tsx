import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { editors } = usePage<{
        editors: User[];
    }>().props;

    return (
        <AdminLayout>
            <TableHeader createRoute={route('admin.editors.create')} />
            <Table />
        </AdminLayout>
    );
}
