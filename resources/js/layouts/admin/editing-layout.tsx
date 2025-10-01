import { navConfig } from '@/lib/data/nav-config';
import pluralizeRu from '@/lib/helpers/pluralize';
import { usePage } from '@inertiajs/react';
import AdminLayout from './admin-layout';
import NavReturn from '@/components/admin/atoms/nav-return';
import { formatDate } from '@/lib/helpers/formatDate';

type EditingLayoutProps = {
    navKey: keyof typeof navConfig;
    title?: string;
    updatedAt?: string;
    children?: React.ReactNode;
};

export default function EditingLayout({
    navKey,
    title,
    updatedAt,
    children,
}: EditingLayoutProps) {
    const { count } = usePage<{ count: number }>().props;
    const nav = navConfig[navKey];

    const badge =
        nav && count !== undefined
            ? `${count} ${pluralizeRu(count, nav.forms[0], nav.forms[1], nav.forms[2])}`
            : null;

    return (
        <AdminLayout>
            {badge && (
                <NavReturn
                    routeName={route(nav.route)}
                    badge={badge}
                    label={`список ${nav.forms[2]}`}
                />
            )}

            {title && (
                <h3 className="mt-12 mb-6 text-center text-xl font-bold sm:mt-16 sm:mb-8 sm:text-2xl lg:mb-10 lg:text-3xl xl:mt-20">
                    {title}
                </h3>
            )}

            {children}

            {updatedAt && (
                <p className="mt-8 text-center text-sm font-semibold sm:text-base">
                    Дата последнего изменения: {formatDate(updatedAt)}
                </p>
            )}
        </AdminLayout>
    );
}
