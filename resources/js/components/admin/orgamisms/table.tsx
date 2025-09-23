import UserPlus from '@/assets/svgs/user-plus.svg';
import { Field, Input, Label } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import BreadCrumbs from '../atoms/breadcrumbs';
import Dropdown from '../atoms/dropdown';

const options = [
    { value: 1, label: 'За сегодня' },
    { value: 7, label: 'За последнюю неделю' },
    { value: 14, label: 'За последние 2 недели' },
    { value: 30, label: 'За последний месяц' },
];

type TableProps = {
    createRoute: string;
};

export default function Table({ createRoute }: TableProps) {
    const [term, setTerm] = useState('');

    const searchParams = new URLSearchParams(window.location.search);
    const parsed = parseInt(searchParams.get('sort_by') ?? '', 10);
    const currentDays = Number.isFinite(parsed) ? parsed : 14;

    return (
        <div>
            <header className="flex items-center justify-between gap-2">
                <BreadCrumbs
                    label={'список администраторов'}
                    badge="30 аккаунтов"
                />
                <Field className="relative w-50">
                    <Label className="sr-only">Поиск</Label>
                    <Input
                        className="peer ease h-full w-full rounded-md border-2 border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-gray-500 hover:border-bright-salad focus:border-bright-salad focus:shadow focus:outline-none sm:text-base xl:text-lg"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="Поиск по разделу"
                    />
                    <Search className="ease absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate-500 transition duration-300 peer-focus:text-bright-salad" />
                </Field>

                <div className="flex items-center gap-2">
                    <Link
                        href={createRoute}
                        className="flex items-center text-sm gap-1.5 rounded-sm bg-bright-salad px-2.5 py-1.5 text-white"
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
                </div>
            </header>
            <div></div>
        </div>
    );
}
