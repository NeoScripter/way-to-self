import CreateUserForm from '@/components/admin/molecules/create-user-form';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {
    return (
        <EditingLayout
            navKey="editors"
            title="Создать редактора"
        >
            <CreateUserForm routeName={route('admin.editors.store')} />
        </EditingLayout>
    );
}
