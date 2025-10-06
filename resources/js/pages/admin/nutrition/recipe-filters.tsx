import AdminLayout from '@/layouts/admin/admin-layout';
import { nutritionMenuItems } from './nutrition-menu-items';
import Filters from '../filters';

export default function RecipeFilters() {
    return (
        <AdminLayout topMenuItems={nutritionMenuItems}>
            <Filters namespace="nutrition" />
        </AdminLayout>
    );
}
