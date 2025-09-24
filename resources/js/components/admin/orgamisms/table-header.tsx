import UserPlus from '@/assets/svgs/user-plus.svg';
import { Link, usePage } from '@inertiajs/react';
import { MoveDown, MoveUp } from 'lucide-react';
import BreadCrumbs from '../atoms/breadcrumbs';
import Dropdown, { SortOption } from '../atoms/dropdown';
import SearchInput from '../atoms/search-input';

type TableHeaderProps = {
    createRoute: string;
    badge: string;
    label: string;
};

export default function TableHeader({
    label,
    badge,
    createRoute,
}: TableHeaderProps) {
    const { options } = usePage<{ options: SortOption[] }>().props;
    const searchParams = new URLSearchParams(window.location.search);
    const sortBy = searchParams.get('sort_by') ?? options[0].value;

    const current = (searchParams.get('order') as 'asc' | 'desc') ?? 'asc';
    const next = current === 'asc' ? 'desc' : 'asc';

    const paramsObj = Object.fromEntries(searchParams.entries());

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 lg:gap-2">
            <BreadCrumbs
                label={label}
                badge={badge}
            />

            <SearchInput className="order-2 lg:order-0" />

            <div className="flex flex-wrap items-center gap-2">
                <Link
                    href={createRoute}
                    className="transition-outline flex cursor-pointer items-center gap-1.5 rounded-md bg-bright-salad px-2.5 py-1.5 text-sm text-white shadow-sm outline-bright-salad/30 duration-100 ease-in hover:outline-3 focus:shadow focus:outline-2 focus:outline-none"
                >
                    <div className="size-3.5 shrink-0 text-white">
                        <img
                            src={UserPlus}
                            alt=""
                            aria-hidden="true"
                            className="size-full object-contain object-center"
                        />
                    </div>
                    Добавить
                </Link>

                <Dropdown
                    options={options}
                    buttonLabel="Сортировка"
                    href={(sortBy) => `?sort_by=${sortBy}`}
                    only={['editors']}
                    currentValue={sortBy}
                />

                <Link
                    href={route('admin.editors.index')}
                    data={{
                        ...paramsObj,
                        ['order']: next,
                    }}
                    preserveScroll
                    only={['editors']}
                    className="ease transition-outline -order-2 flex cursor-pointer items-center rounded-md border-2 border-slate-200 bg-white px-2 py-2 text-sm text-slate-500 shadow-sm outline-slate-200/60 duration-100 hover:outline-3 focus:shadow focus:outline-3 focus:outline-none sm:order-0"
                >
                    {current === 'asc' ? (
                        <MoveUp className="size-3.5 text-lime-600" />
                    ) : (
                        <MoveDown className="size-3.5 text-red-700" />
                    )}
                </Link>
            </div>
        </header>
    );
}
