import PlanUpsert from '@/components/admin/molecules/plan-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {
    return (
        <EditingLayout
            navKey="plans"
            title="Редактировать тариф"
        >
            <PlanUpsert routeName={route('admin.plans.store')} />
        </EditingLayout>
    );
}

