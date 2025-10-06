import AdminLayout from '@/layouts/admin/admin-layout';
import { bodyMenuItems } from './body-menu-items';
import Filters from '../filters';

export default function ProgramFilters() {
    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <Filters namespace="body.programs" />
        </AdminLayout>
    );
}
