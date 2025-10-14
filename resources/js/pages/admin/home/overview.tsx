import ConfirmationDialog from '@/components/admin/molecules/confirmation-dialog';
import OverviewUpsert from '@/components/admin/molecules/overview-upsert';
import useToggle from '@/hooks/use-toggle';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Overview as OverviewType } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { homeMenuItems } from './home-menu-items';

export default function Overview() {
    const [show, toggle] = useToggle(false);

    const { overview } = usePage<{
        overview: OverviewType;
    }>().props;

    return (
        <AdminLayout
            topMenuItems={homeMenuItems}
            pageClass="space-y-6 sm:space-y-8"
        >
            <h3 className="text-lg font-bold uppercase sm:text-xl">
                Видео на главной странице
            </h3>

            <OverviewUpsert
                overview={overview}
                routeName={
                    overview != null
                        ? route('admin.home.overview.update', overview.id)
                        : route('admin.home.overview.store')
                }
            />

            <ConfirmationDialog
                show={show}
                closeDialog={() => toggle(false)}
                title="Вы точно уверены, что хотите удалить данное видео?"
                routeName={route(`admin.home.overview.destroy`)}
                methodName="delete"
                confirmBtnLabel="Удалить"
                cancelBtnLabel="Отмена"
            />
        </AdminLayout>
    );
}
