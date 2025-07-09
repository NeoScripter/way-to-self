import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/starter-kit/appearance-tabs';
import HeadingSmall from '@/components/starter-kit/heading-small';

import AppLayout from '@/layouts/admin/admin-layout';
import SettingsLayout from '@/layouts/admin/settings-layout';

export default function Appearance() {
    return (
        <AppLayout>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
