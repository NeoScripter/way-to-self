import { cn } from '@/lib/utils';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ArrowUp, EllipsisVertical } from 'lucide-react';
import { Fragment } from 'react';

export type UserMetricsProps = {
    id: string;
    icon: string;
    title: string;
    diff: number;
    quantity: number;
    paramName: string;
};

const options = [
    { days: 1, label: 'За сегодня' },
    { days: 7, label: 'За последнюю неделю' },
    { days: 14, label: 'За последние 2 недели' },
    { days: 30, label: 'За последний месяц' },
];

export default function UserMetrics({
    icon,
    title,
    diff,
    quantity,
    paramName,
}: UserMetricsProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const parsed = parseInt(searchParams.get(paramName) ?? '', 10);
    const currentDays = Number.isFinite(parsed) ? parsed : 14;

    const paramsObj = Object.fromEntries(searchParams.entries());

    return (
        <li className="rounded-3xl border border-pale-swamp bg-mute-white px-5 py-6">
            <div className="mb-3 flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold 2xl:text-base">{title}</h4>
                <Menu>
                    <MenuButton as={Fragment}>
                        <button className="cursor-pointer">
                            <EllipsisVertical className="size-6" />
                        </button>
                    </MenuButton>
                    <MenuItems
                        className="rounded-md border border-bright-salad bg-white outline-none"
                        anchor="bottom end"
                    >
                        {options.map(({ days, label }) => (
                            <MenuItem
                                key={days}
                                as={Fragment}
                            >
                                {({ focus }) => (
                                    <Link
                                        className={cn(
                                            'block px-2 py-1',
                                            focus && 'bg-transparent-gray',
                                            currentDays === days &&
                                                'font-semibold',
                                        )}
                                        data={{
                                            ...paramsObj,
                                            [paramName]: days,
                                        }}
                                        href={''}
                                        only={['userData']}
                                        preserveState={true}
                                        preserveScroll={true}
                                    >
                                        {label}
                                    </Link>
                                )}
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>
            </div>

            <div className="mb-2 flex items-center justify-between gap-4">
                <figure
                    aria-hidden="true"
                    className="rounded-md bg-bright-salad p-2.5"
                >
                    <img
                        src={icon}
                        alt=""
                        className="size-6"
                    />
                </figure>
                <span className="mr-auto font-semibold">{quantity}</span>
                <span className="flex items-center gap-1 text-sm font-semibold">
                    <ArrowUp
                        className={cn(
                            'size-5',
                            diff >= 0
                                ? 'text-bright-salad'
                                : 'rotate-180 text-red-700',
                        )}
                    />
                    {Math.abs(diff)}
                </span>
            </div>

            <span className="block text-right text-xs font-medium text-slate-700">
                {options.find((option) => option.days === currentDays)?.label}
            </span>
        </li>
    );
}
