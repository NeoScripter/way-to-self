import AdminLayout from '@/layouts/admin/admin-layout';
import FaqItems from '../faq-items';
import { soulMenuItems } from './soul-menu-items';

export default function Faqs() {
    return (
        <AdminLayout topMenuItems={soulMenuItems}>
            <FaqItems namespace="soul" />
        </AdminLayout>
    );
}
