import CreditCard from '@/assets/svgs/admin/admin-metrics-credit-card.svg';
import Ghost from '@/assets/svgs/admin/admin-metrics-ghost.svg';
import User from '@/assets/svgs/admin/admin-metrics-user.svg';
import TierMetrics, {
    TierMetricsProps,
} from '@/components/admin/molecules/tier-metrics';
import UserMetrics, {
    UserMetricsProps,
} from '@/components/admin/molecules/user-metrics';
import AdminLayout from '@/layouts/admin/admin-layout';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    let { userData, tierData } = usePage<{
        userData: UserMetricsProps[];
        tierData: TierMetricsProps[];
    }>().props;

    const svgs = [User, CreditCard, Ghost];

    userData = userData.map((card, idx) => ({
        ...card,
        icon: svgs[idx],
    }));

    return (
        <AdminLayout pageClass="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <ul className="grid gap-6 lg:col-span-3 lg:grid-cols-3 lg:gap-12 xl:gap-13.5">
                {userData.map((item) => (
                    <UserMetrics
                        key={item.id}
                        {...item}
                    />
                ))}
            </ul>
            {tierData.map((item) => (
                <TierMetrics
                    className=""
                    key={item.id}
                    {...item}
                />
            ))}
        </AdminLayout>
    );
}
