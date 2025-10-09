import AdminLayout from '@/layouts/admin/admin-layout';
import Categories from '../categories';
import { nutritionMenuItems } from './nutrition-menu-items';

export default function RecipeCategories() {
    return (
        <AdminLayout topMenuItems={nutritionMenuItems}>
            <Categories namespace="nutrition" />
        </AdminLayout>
    );
}
