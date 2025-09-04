import { MenuItem as itemType } from '@/lib/data/account-menu-items';
import { cn } from '@/lib/utils';
import { Checkbox } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';

function toggleTypeUrl(type: string, params: URLSearchParams) {
    const current: string[] = [];

    params.forEach((value, key) => {
        if (key.startsWith('types[')) {
            current.push(value);
        }
    });

    let updated: string[];
    if (current.includes(type)) {
        updated = current.filter((t) => t !== type);
    } else {
        updated = [...current, type];
    }

    const newParams = new URLSearchParams();
    params.forEach((value, key) => {
        if (!key.startsWith('types[')) {
            newParams.set(key, value);
        }
    });
    updated.forEach((t, i) => newParams.set(`types[${i}]`, t));

    return `?${newParams.toString()}`;
}

function clearTypesUrl(url: string) {
    return `?page=1`;
}

type CategoryFiltersProps = {
    className?: string;
    onClose?: () => void;
    items: itemType[];
    propName: string;
};

export default function CategoryFilters({
    className,
    onClose,
    items,
    propName
}: CategoryFiltersProps) {
    const { url } = usePage();

    return (
        <div
            className={cn(
                'relative grid max-w-84 min-w-60 flex-1 gap-6 rounded-4xl border-2 border-white/20 bg-card-backdrop-gray/50 p-7 pb-15 backdrop-blur-sm',
                className,
            )}
        >
            {onClose != null && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 flex size-8 cursor-pointer items-center justify-center opacity-50 transition-opacity duration-200 ease-in hover:opacity-100 md:size-12"
                >
                    <X className="size-10" />
                </button>
            )}

            <h3 className="text-2xl font-semibold uppercase lg:hidden">
                Фильтры
            </h3>

            {url.includes('types') || url.includes('search') && (
                <Link
                    as="button"
                    preserveScroll
                    preserveState
                    href={clearTypesUrl(url)}
                    className="flex cursor-pointer items-center gap-2 text-xl text-gray-300"
                >
                    <X className="size-6 text-gray-300" />
                    Сбросить все
                </Link>
            )}

            {items.map((item) => (
                <div key={item.id}>
                    <h4 className="mb-3 text-xl font-semibold underline underline-offset-4">
                        {item.title}
                    </h4>
                    <ul className="space-y-2">
                        {item.items.map((listItem) => (
                            <MenuItem
                                key={listItem.id}
                                type={listItem.type}
                                label={listItem.label}
                                propName={propName}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

type MenuItemProps = {
    type: string;
    label: string;
    propName: string;
};

function MenuItem({ type, label, propName }: MenuItemProps) {
    const { url } = usePage();
    const params = new URLSearchParams(url.split('?')[1]);

    const types: string[] = [];
    params.forEach((value, key) => {
        if (key.startsWith('types[')) {
            types.push(value);
        }
    });

    return (
        <li className="list-none">
            <Link
                href={toggleTypeUrl(type, params)}
                as="button"
                preserveScroll
                preserveState
                only={[propName]}
                className="flex items-center gap-2"
            >
                <Checkbox
                    name={type}
                    id={type}
                    checked={types.includes(type)}
                    className="group size-4 shrink-0 rounded-xs border border-white/20 shadow-xs ring-[1px] data-checked:bg-bright-salad"
                >
                    <svg
                        className="stroke-white opacity-0 group-data-checked:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                    >
                        <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Checkbox>
                <label
                    htmlFor={type}
                    className="cursor-pointer"
                >
                    {label}
                </label>
            </Link>
        </li>
    );
}
