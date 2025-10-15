import AdminLayout from '@/layouts/admin/admin-layout';
import Filters from '../filters';
import { bodyMenuItems } from './body-menu-items';

export default function ProgramFilters() {
    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <Filters namespace="body.programs" />
        </AdminLayout>
    );
}
