import UserPlus from '@/assets/svgs/user-plus.svg';
import { Link } from '@inertiajs/react';
import { MoveDown, MoveUp } from 'lucide-react';
import BreadCrumbs from '../atoms/breadcrumbs';
import Dropdown from '../atoms/dropdown';
import SearchInput from '../atoms/search-input';

const options = [
    { value: 1, label: 'За сегодня' },
    { value: 7, label: 'За последнюю неделю' },
    { value: 14, label: 'За последние 2 недели' },
    { value: 30, label: 'За последний месяц' },
];

type TableHeaderProps = {
    createRoute: string;
};

export default function TableHeader({ createRoute }: TableHeaderProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const parsed = parseInt(searchParams.get('sort_by') ?? '', 10);
    const currentDays = Number.isFinite(parsed) ? parsed : 14;

    const current = (searchParams.get('order') as 'asc' | 'desc') ?? 'asc';
    const next = current === 'asc' ? 'desc' : 'asc';

    const paramsObj = Object.fromEntries(searchParams.entries());

    return (
        <header className="flex items-center justify-between gap-2">
            <BreadCrumbs
                label={'список администраторов'}
                badge="30 аккаунтов"
            />

            <SearchInput />

            <div className="flex items-center gap-2">
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
                    href={(days) => `?days=${days}`}
                    only={['userData']}
                    currentValue={currentDays}
                />

                <Link
                    href={route('admin.editors.index')}
                    data={{
                        ...paramsObj,
                        ['order']: next,
                    }}
                    preserveScroll
                    className="ease transition-outline flex cursor-pointer items-center rounded-md border-2 border-slate-200 bg-white px-2 py-2 text-sm text-slate-500 shadow-sm outline-slate-200/60 duration-100 hover:outline-3 focus:shadow focus:outline-3 focus:outline-none"
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
