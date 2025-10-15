import NavReturn from '@/components/admin/atoms/nav-return';
import ErrorFallback from '@/components/shared/molecules/error-fallback';
import { navConfig } from '@/lib/data/nav-config';
import { formatDate } from '@/lib/helpers/formatDate';
import pluralizeRu from '@/lib/helpers/pluralize';
import { usePage } from '@inertiajs/react';
import { ErrorBoundary } from 'react-error-boundary';
import AdminLayout from './admin-layout';

type EditingLayoutProps = {
    navKey: keyof typeof navConfig;
    title?: string;
    updatedAt?: string;
    children?: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
};

export default function EditingLayout({
    navKey,
    title,
    updatedAt,
    children,
    layoutClass,
    pageClass,
}: EditingLayoutProps) {
    const { count, namespace = '' } = usePage<{
        count: number;
        namespace: string | undefined;
    }>().props;
    const suffix = namespace !== '' ? `_${namespace}` : '';
    const nav = navConfig[`${navKey}${suffix}`];

    const badge =
        nav && count !== undefined
            ? `${count} ${pluralizeRu(count, nav.forms[0], nav.forms[1], nav.forms[2])}`
            : null;

    return (
        <AdminLayout
            pageClass={pageClass}
            layoutClass={layoutClass}
        >
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

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                {children}
            </ErrorBoundary>

            {updatedAt && (
                <p className="mt-8 text-center text-sm font-semibold sm:text-base">
                    Дата последнего изменения: {formatDate(updatedAt)}
                </p>
            )}
        </AdminLayout>
    );
}
