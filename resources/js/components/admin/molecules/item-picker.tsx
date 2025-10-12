import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import Input from '../atoms/input';
import { shortenDescription } from '@/lib/helpers/shortenDescription';

export type Item = {
    id: number;
    image: string | undefined;
    title: string;
    description: string;
};

export type Option = {
    id: number;
    title: string;
    image?: string;
};

type Props = {
    label?: string;
    selected: Item[];
    options: Option[];
    onRemove: string;
    onAdd: string;
    placeholder: string;
    payload?: Record<string, any>;
};

export default function ItemPicker({
    label,
    placeholder,
    options,
    selected,
    onRemove,
    onAdd,
    payload,
}: Props) {
    const [term, setTerm] = useState('');
    const [focused, setFocused] = useState(false);

    options = options.filter((o) =>
        o.title.toLowerCase().includes(term.toLowerCase()),
    );

    const show = term !== '' || focused;

    return (
        <section className="">
            {label && <h4 className="mb-4 font-bold">{label}</h4>}

            <div className="rounded-md border border-text-black p-4 font-normal md:p-10">
                <div className="relative mb-10 max-w-100">
                    <Input
                        placeholder={placeholder}
                        className=""
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setTimeout(() => setFocused(false), 100)}
                    />

                    <Transition show={show}>
                        <ul className="absolute [top:calc(100%+10px)] right-0 left-0 z-10 grid max-h-500 rounded-sm border border-text-black bg-white text-sm font-medium transition-all duration-500 ease-in data-closed:max-h-0 data-closed:opacity-0 data-closed:ease-out sm:text-base">
                            {options.length === 0 ? (
                                <li className="w-full cursor-pointer px-2 py-1 text-center">
                                    По вашему запросу не найдено результатов
                                </li>
                            ) : (
                                options.map((opt) => (
                                    <OptionItem
                                        key={opt.id}
                                        option={opt}
                                        onAdd={onAdd}
                                        payload={payload}
                                    />
                                ))
                            )}
                        </ul>
                    </Transition>
                </div>

                <ul className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
                    {selected.map((item) => (
                        <SelectedItem
                            key={item.id}
                            item={item}
                            onRemove={onRemove}
                            payload={payload}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

type OptionItemProps = {
    option: Option;
    onAdd: string;
    payload?: Record<string, any>;
};

function OptionItem({ option, onAdd, payload }: OptionItemProps) {
    return (
        <li className="group relative">
            <Link
                href={route(onAdd, option.id)}
                method="patch"
                preserveScroll
                preserveState
                data={payload}
                className="w-full cursor-pointer px-2 py-1 transition-colors duration-200 hover:bg-bright-salad/50"
            >
                {option.title}
            </Link>

            {option.image && (
                <div className="pointer-events-none absolute top-1/2 right-0 z-10 hidden max-w-30 translate-x-full -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
                    <img
                        src={option.image}
                        alt=""
                        className="size-full object-contain"
                    />
                </div>
            )}
        </li>
    );
}

type SelectedItemProps = {
    item: Item;
    onRemove: string;
    payload?: Record<string, any>;
};

function SelectedItem({ item, onRemove, payload }: SelectedItemProps) {
    return (
        <li className="relative space-y-2">
            {item.image && (
                <div className="size-40">
                    <img
                        src={item.image}
                        alt=""
                        className="size-full"
                    />
                </div>
            )}

            <Link
                href={route(onRemove, item.id)}
                preserveScroll
                preserveState
                data={payload}
                method="patch"
            >
                <X className="size-4 text-white" />
            </Link>

            <h5 className='text-sm'>{item.title}</h5>
            <p className='text-xs'>{shortenDescription(item.description)}</p>
        </li>
    );
}
