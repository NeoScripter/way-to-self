import AdminLayout from '@/layouts/admin/admin-layout';
import FaqItems from '../faq-items';
import { bodyMenuItems } from './body-menu-items';

export default function Faqs() {
    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <FaqItems namespace="body" />
        </AdminLayout>
    );
}
