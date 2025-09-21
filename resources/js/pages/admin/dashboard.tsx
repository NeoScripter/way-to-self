import AdminLayout from '@/layouts/admin/admin-layout';
import { userMetrics } from '@/lib/data/user-metrics-data';

export default function Dashboard() {
    return (
        <AdminLayout pageClass="">
            <ul className="grid gap-6">
                {userMetrics.map(item => (
                    <UserMetrics key={item.id} {...item} />
                ))}
            </ul>
        </AdminLayout>
    );
}

export type UserMetricsProps = {
    id: string;
    icon: string;
    title: string;
    diff: number;
    quantity: number;
};

function UserMetrics({ icon, title, diff, quantity }: UserMetricsProps) {
    return (
        <li className="rounded-3xl border border-pale-swamp bg-mute-white px-4 py-6">
            <h4 className='font-semibold mb-3'>{title}</h4>

            <div>

            </div>
        </li>
    );
}
