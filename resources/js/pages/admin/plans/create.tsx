import NavReturn from '@/components/admin/atoms/nav-return';
import CreatePromoForm from '@/components/admin/molecules/create-promo-form';
import AdminLayout from '@/layouts/admin/admin-layout';
import pluralizeRu from '@/lib/helpers/pluralize';
import { usePage } from '@inertiajs/react';

export default function Create() {
    const { count } = usePage<{
        count: number;
    }>().props;

    const badge = pluralizeRu(count, 'тариф', 'тарифа', 'тарифов');

    return (
        <AdminLayout>
            <NavReturn
                routeName={route('admin.promos.index')}
                badge={`${count} ${badge}`}
                label="список промокодов"
            />

            <h3 className="mt-12 mb-6 text-center text-xl font-bold sm:mt-16 sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl xl:mt-20">
                Создать промокод
            </h3>

            <CreatePromoForm routeName={route('admin.promos.store')} />
        </AdminLayout>
    );
}
