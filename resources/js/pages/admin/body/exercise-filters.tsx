import AdminLayout from '@/layouts/admin/admin-layout';
import Filters from '../filters';
import { bodyMenuItems } from './body-menu-items';

export default function ExerciseFilters() {
    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <Filters namespace="body.exercise" />
        </AdminLayout>
    );
}
