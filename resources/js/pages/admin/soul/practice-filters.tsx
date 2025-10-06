import AdminLayout from '@/layouts/admin/admin-layout';
import { soulMenuItems } from './soul-menu-items';
import Filters from '../filters';

export default function PracticeFilters() {
    return (
        <AdminLayout topMenuItems={soulMenuItems}>
            <Filters namespace="soul.practices" />
        </AdminLayout>
    );
}
