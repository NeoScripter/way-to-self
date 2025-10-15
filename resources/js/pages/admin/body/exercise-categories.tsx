import AdminLayout from '@/layouts/admin/admin-layout';
import Categories from '../categories';
import { bodyMenuItems } from './body-menu-items';

export default function ExerciseCategories() {
    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <Categories namespace="body" />
        </AdminLayout>
    );
}
