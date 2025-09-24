import { cn } from '@/lib/utils';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';

export type SortOption = {
    label: string;
    value: string | number;
};

type DropdownProps = {
    options: SortOption[];
    buttonLabel: string;
    paramObj: {
        [k: string]: string;
    };
    only?: string[];
    currentValue?: string | number;
    className?: string;
};

export default function Dropdown({
    options,
    buttonLabel,
    paramObj,
    only,
    currentValue,
    className,
}: DropdownProps) {
    return (
        <Menu>
            <MenuButton
                className={cn(
                    'transition-outline flex cursor-pointer items-center gap-1 rounded-md border-2 border-slate-200 bg-white py-1 pr-2 pb-1.5 pl-1 text-sm text-slate-500 shadow-sm outline-slate-200/60 duration-100 ease-in hover:outline-3 focus:shadow focus:outline-3 focus:outline-none',
                    className,
                )}
            >
                <ChevronDown className="mt-0.5 size-4" />
                {buttonLabel}
            </MenuButton>

            <MenuItems
                className="cursor-pointer rounded-md border-2 border-slate-200 bg-white px-2 py-1 text-sm text-slate-500 shadow-sm outline-slate-200/60 hover:outline-3 focus:shadow focus:outline-3 focus:outline-none"
                anchor="bottom end"
            >
                {options.map(({ value, label }) => (
                    <MenuItem
                        key={value}
                        as={Fragment}
                    >
                        {({ focus }) => (
                            <Link
                                className={cn(
                                    'block px-2 py-1',
                                    focus && 'bg-transparent-gray',
                                    currentValue === value && 'font-semibold',
                                )}
                                data={{
                                    ...paramObj,
                                    ['sort_by']: value
                                }}
                                href=""
                                {...(only ? { only } : {})}
                                preserveScroll
                            >
                                {label}
                            </Link>
                        )}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}
