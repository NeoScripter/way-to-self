import AdminLayout from '@/layouts/admin/admin-layout';
import FaqItems from '../faq-items';
import { homeMenuItems } from './home-menu-items';

export default function Faqs() {
    return (
        <AdminLayout topMenuItems={homeMenuItems}>
            <FaqItems namespace="home" />
        </AdminLayout>
    );
}
