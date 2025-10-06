import AdminLayout from '@/layouts/admin/admin-layout';
import FaqItems from '../faq-items';
import { nutritionMenuItems } from './nutrition-menu-items';

export default function Faqs() {
    return (
        <AdminLayout topMenuItems={nutritionMenuItems}>
            <FaqItems namespace="nutrition" />
        </AdminLayout>
    );
}
