import { PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import Pagination from '../atoms/pagination';

type TableProps = {
    children: React.ReactNode;
    columns: string[];
    width: string;
    meta: PaginationMeta<unknown>;
};

export default function Table({ meta, children, width, columns }: TableProps) {
    return (
        <div>
            <div className="overflow-x-auto pb-9">
                <div
                    className={cn(
                        'my-9 flex items-center justify-between gap-2 text-pale-gray',
                        width,
                    )}
                >
                    {columns.map((column, idx) => (
                        <span
                            key={idx}
                            className="text-center first-of-type:text-left last-of-type:text-right"
                        >
                            {column}
                        </span>
                    ))}
                </div>

                <div className={cn('space-y-4', width)}>{children}</div>
            </div>
            <Pagination
                className="mt-10"
                meta={meta}
            />
        </div>
    );
}
