import BotUpsert from '@/components/admin/molecules/bot-upsert';
import AdminLayout from '@/layouts/admin/admin-layout';
import { usePage } from '@inertiajs/react';
import { botMenuItems } from './bot-menu-items';

export default function Bot() {
    const { tg_greet = '', namespace } = usePage<{ tg_greet: string, namespace: string }>().props;

    return (
        <AdminLayout
            topMenuItems={botMenuItems}
            pageClass="space-y-6 sm:space-y-8"
        >
            <div>
                <BotUpsert
                    routeName={route(`admin.bot.${namespace}.update`)}
                    tg_greet={tg_greet}
                />
            </div>
        </AdminLayout>
    );
}
