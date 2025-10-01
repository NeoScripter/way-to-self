import CreatePromoForm from '@/components/admin/molecules/create-promo-form';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {
    return (
        <EditingLayout
            navKey="promos"
            title="Создать промокод"
        >
            <CreatePromoForm routeName={route('admin.promos.store')} />
        </EditingLayout>
    );
}
