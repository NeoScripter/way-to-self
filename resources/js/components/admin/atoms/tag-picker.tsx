import capitalize from '@/lib/helpers/capitalize';
import { cn } from '@/lib/utils';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { ChevronsUpDown, X } from 'lucide-react';
import { Fragment } from 'react';
import InputError from './input-error';
import InputLabel from './input-label';

export type TagPickerOption = {
    value: number;
    label: string;
};

type TagPickerProps = {
    value: number[];
    onChange: (val: number[]) => void;
    error?: string;
    options: TagPickerOption[];
    className?: string;
    disabled?: boolean;
};

export default function TagPicker({
    value,
    onChange,
    error,
    options,
    className,
    disabled = false,
}: TagPickerProps) {
    const selectedOptions = options.filter((option) =>
        value.includes(option.value),
    );

    const addOption = (id: number) => {
        if (value.includes(id)) return;
        onChange([...value, id]);
    };

    const removeOption = (id: number) => {
        onChange(value.filter((option) => option !== id));
    };

    return (
        <div className={cn("max-w-120 select-none space-y-5", className)}>
            <div className="grid content-start gap-4">
                <InputLabel>Фильтры</InputLabel>

                <Listbox
                    {...(disabled && { disabled })}
                    value={-1}
                    onChange={(v) => addOption(v)}
                >
                    <div className={cn('relative z-20 mt-1')}>
                        <ListboxButton
                            className={cn(
                                'focus-visible:border-ring flex h-12 w-full items-center justify-between rounded-lg border border-text-black bg-white px-4 py-1 text-center text-sm text-text-black shadow-sm transition-[color,box-shadow] outline-none md:text-base',
                                !disabled &&
                                    'cursor-pointer hover:ring-[3px] hover:ring-gray-600/20 focus-visible:ring-[3px] focus-visible:ring-gray-600/20',
                            )}
                        >
                            <span className="mx-auto">Название фильтра</span>
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
                                                focus
                                                    ? 'bg-bright-salad/20'
                                                    : ''
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
                <InputError
                    className="mt-2"
                    message={error}
                />
            </div>

            <div className="flex flex-wrap gap-2">
                {selectedOptions.map((option) => (
                    <Tag
                        onClick={() => removeOption(option.value)}
                        key={option.label}
                        item={option}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
}

type TagProps = {
    item: TagPickerOption;
    onClick: () => void;
    disabled?: boolean;
};

function Tag({ item, onClick, disabled = false }: TagProps) {
    return (
        <div className="flex items-center gap-2 rounded-md bg-bright-salad px-2 py-1 text-white">
            <span>{capitalize(item.label)}</span>
            <button
                disabled={disabled}
                onClick={onClick}
                type="button"
                className={cn(
                    'text-gray-300 transition-colors',
                    !disabled && 'cursor-pointer hover:text-gray-400',
                )}
            >
                <X className="size-6" />
            </button>
        </div>
    );
}
