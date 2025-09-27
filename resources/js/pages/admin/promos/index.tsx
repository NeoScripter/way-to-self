import Table from '@/components/admin/orgamisms/table';
import TableHeader from '@/components/admin/orgamisms/table-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import { formatDate } from '@/lib/helpers/formatDate';
import pluralizeRu from '@/lib/helpers/pluralize';
import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Promo } from '@/types/model';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { promos, count } = usePage<{
        promos: PaginationMeta<Promo>;
        count: number;
    }>().props;

    const badge = pluralizeRu(count, 'промокод', 'промокода', 'промокодов');

    return (
        <AdminLayout>
            <TableHeader
                only={['promos']}
                label={'все промокоды'}
                badge={`${count} ${badge}`}
                createRoute={route('admin.promos.create')}
            />
            <Table
                meta={promos}
                width="min-w-150"
                columns={['Промокод', 'Скидка', 'Срок действия']}
            >
                {promos.data.map((promo) => (
                    <PromoItem
                        key={promo.id}
                        promo={promo}
                    />
                ))}
            </Table>
        </AdminLayout>
    );
}

type PromoItemProps = {
    promo: Promo;
};

function PromoItem({ promo }: PromoItemProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-2 text-text-black md:justify-between',
                !promo.enabled && 'text-red-700',
            )}
        >
            <div className="w-3/7">
                <Link
                    href={route('admin.promos.show', promo.id)}
                    className="cursor-pointer text-left underline-offset-4 transition-colors duration-200 ease-in-out hover:text-bright-salad hover:underline"
                    as="button"
                >{`${promo.name}`}</Link>
            </div>
            <span className="">{promo.discount}</span>
            <span className="ml-auto text-right">
                {formatDate(promo.expires_at)}
            </span>
        </div>
    );
}
