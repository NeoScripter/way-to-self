import AdminLayout from '@/layouts/admin/admin-layout';
import Filters from '../filters';
import { nutritionMenuItems } from './nutrition-menu-items';

export default function RecipeFilters() {
    return (
        <AdminLayout topMenuItems={nutritionMenuItems}>
            <Filters namespace="nutrition" />
        </AdminLayout>
    );
}
