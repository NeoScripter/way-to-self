import AdminLayout from '@/layouts/admin/admin-layout';
import Filters from '../filters';
import { soulMenuItems } from './soul-menu-items';

export default function PracticeFilters() {
    return (
        <AdminLayout topMenuItems={soulMenuItems}>
            <Filters namespace="soul.practices" />
        </AdminLayout>
    );
}
