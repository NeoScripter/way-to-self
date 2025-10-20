import AdminLayout from '@/layouts/admin/admin-layout';
import { usePage } from '@inertiajs/react';
import { LegalInfo } from '@/types/model';
import { legalMenuItems } from './legal-menu-items';
import LegalUpsert from '@/components/admin/molecules/legal-upsert';

export default function Legal() {
    const { info, namespace } = usePage<{ info: LegalInfo, namespace: string }>().props;

    return (
        <AdminLayout
            topMenuItems={legalMenuItems}
            pageClass="space-y-6 sm:space-y-8"
        >
            <div>
                <LegalUpsert
                    routeName={route(`admin.legal.${namespace}.update`)}
                    info={info}
                />
            </div>
        </AdminLayout>
    );
}
