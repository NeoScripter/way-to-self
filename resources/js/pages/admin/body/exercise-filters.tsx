import AdminLayout from '@/layouts/admin/admin-layout';
import { bodyMenuItems } from './body-menu-items';
import Filters from '../filters';

export default function ExerciseFilters() {
    return (
        <AdminLayout topMenuItems={bodyMenuItems}>
            <Filters namespace="body.exercise" />
        </AdminLayout>
    );
}
