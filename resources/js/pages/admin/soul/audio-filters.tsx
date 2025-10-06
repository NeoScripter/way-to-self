import AdminLayout from '@/layouts/admin/admin-layout';
import { soulMenuItems } from './soul-menu-items';
import Filters from '../filters';

export default function AudioFilters() {
    return (
        <AdminLayout topMenuItems={soulMenuItems}>
            <Filters namespace="soul.audios" />
        </AdminLayout>
    );
}
