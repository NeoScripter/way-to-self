import AdminLayout from '@/layouts/admin/admin-layout';
import { bodyMenuItems } from './body-menu-items';
import Categories from '../categories';

export default function ExerciseCategories() {
    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <Categories namespace="body" />
        </AdminLayout>
    );
}
