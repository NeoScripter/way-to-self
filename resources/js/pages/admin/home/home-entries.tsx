import HomeEntry from '@/components/admin/molecules/home-entry';
import AdminLayout from '@/layouts/admin/admin-layout';
import { homeMenuItems } from './home-menu-items';

export default function HomeEntries() {
    return (
        <AdminLayout
            topMenuItems={homeMenuItems}
            pageClass="space-y-6 sm:space-y-8"
        >
            <HomeEntry />
        </AdminLayout>
    );
}
