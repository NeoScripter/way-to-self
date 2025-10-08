import { cn } from '@/lib/utils';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { ChevronsUpDown } from 'lucide-react';
import { Fragment } from 'react';

export type Option<T extends string | number> = {
    value: T;
    label: string;
};

type SelectBoxProps<T extends string | number> = {
    value: T;
    onChange: (val: T) => void;
    options: Option<T>[];
    className?: string;
    disabled?: boolean;
};

export default function SelectBox<T extends string | number>({
    value,
    onChange,
    options,
    className,
    disabled = false,
}: SelectBoxProps<T>) {
    const selected = options.find((opt) => opt.value === value);

    // In case of passing a dummy value with -1 to use as a title
    // so that it doesn't display in the list
    options = options.filter((o) =>
        typeof o.value === 'number' ? o.value >= 0 : true,
    );

    return (
        <Listbox
            {...(disabled && { disabled })}
            value={value}
            onChange={onChange}
        >
            <div className={cn('relative', className)}>
                <ListboxButton
                    className={cn(
                        'focus-visible:border-ring flex h-12 w-full items-center justify-between rounded-lg border border-text-black bg-white px-4 py-1 text-center text-sm text-text-black shadow-sm transition-[color,box-shadow] outline-none md:text-base',
                        !disabled &&
                            'cursor-pointer hover:ring-[3px] hover:ring-gray-600/20 focus-visible:ring-[3px] focus-visible:ring-gray-600/20',
                    )}
                >
                    <span className="mx-auto">{selected?.label}</span>
                    <ChevronsUpDown className="h-4 w-4 text-text-black" />
                </ListboxButton>

                <ListboxOptions className="focus-visible:border-ring absolute z-10 mt-1 w-full rounded-md border border-text-black bg-white py-1 shadow-sm transition-[color,box-shadow] outline-none hover:ring-[3px] hover:ring-gray-600/20 focus-visible:ring-[3px] focus-visible:ring-gray-600/20">
                    {options.map((opt) => (
                        <ListboxOption
                            key={opt.value}
                            value={opt.value}
                            as={Fragment}
                        >
                            {({ selected, focus }) => (
                                <div
                                    className={`cursor-pointer px-3 py-1 text-center ${
                                        focus ? 'bg-bright-salad/20' : ''
                                    } ${
                                        selected
                                            ? 'font-semibold text-text-black'
                                            : 'text-slate-500'
                                    }`}
                                >
                                    {opt.label}
                                </div>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
