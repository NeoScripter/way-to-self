import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import Pagination from '../atoms/pagination';

type TableProps = {
    children: React.ReactNode;
    columns: string[];
    width: string;
    meta: PaginationMeta<unknown>;
    isEmpty?: boolean;
    columnClass?: string;
};

export default function Table({
    meta,
    children,
    width,
    columns,
    isEmpty = false,
    columnClass
}: TableProps) {
    const params = new URLSearchParams(window.location.search);
    const emptyBox =
        params.has('search') && params.get('search') !== ''
            ? 'По вашему запросу ничего не найдено'
            : 'Пока здесь ничего нет';

    return (
        <div>
            <div className="overflow-x-auto pb-9 text-xs sm:text-sm lg:text-base">
                <div
                    className={cn(
                        'my-9 flex items-center justify-between gap-2 text-pale-gray [&>*]:flex-1',
                        width,
                    )}
                >
                    {columns.map((column, idx) => (
                        <span
                            key={idx}
                            className={cn("text-center first-of-type:text-left last-of-type:text-right", columnClass)}
                        >
                            {column}
                        </span>
                    ))}
                </div>

                {isEmpty ? (
                    <div className="text-balance text-sm md:text-base">{emptyBox}</div>
                ) : (
                    <div className={cn('space-y-4', width)}>{children}</div>
                )}
            </div>
            <Pagination
                className="mt-10"
                meta={meta}
            />
        </div>
    );
}
