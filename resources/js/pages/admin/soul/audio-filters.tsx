import AdminLayout from '@/layouts/admin/admin-layout';
import Filters from '../filters';
import { soulMenuItems } from './soul-menu-items';

export default function AudioFilters() {
    return (
        <AdminLayout topMenuItems={soulMenuItems}>
            <Filters namespace="soul.audios" />
        </AdminLayout>
    );
}
