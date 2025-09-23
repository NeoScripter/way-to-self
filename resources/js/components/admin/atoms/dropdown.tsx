import { cn } from '@/lib/utils';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';

type Option = {
    label: string;
    value: string | number;
};

type DropdownProps = {
    options: Option[];
    buttonLabel: string;
    href: (value: string | number) => string;
    only?: string[];
    currentValue?: string | number;
};

export default function Dropdown({
    options,
    buttonLabel,
    href,
    only,
    currentValue,
}: DropdownProps) {
    return (
        <Menu>
            <MenuButton className="flex cursor-pointer pb-1.5 items-center gap-1 ease rounded-md border-2 border-slate-200 bg-white pl-1 pr-2 py-1 text-sm text-slate-500 shadow-sm transition-outline duration-300 outline-slate-200/60 hover:outline-3 focus:outline-3 focus:shadow focus:outline-none">
                <ChevronDown className="size-4 mt-0.5" />
                {buttonLabel}
            </MenuButton>

            <MenuItems
                className="cursor-pointer rounded-md border-2 border-slate-200 bg-white px-2 py-1 text-sm text-slate-500 shadow-sm outline-slate-200/60 hover:outline-3 focus:outline-3 focus:shadow focus:outline-none"
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
                                href={href(value)}
                                {...(only ? { only } : {})}
                                preserveState
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
