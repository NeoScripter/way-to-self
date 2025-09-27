import useDebounce from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { Field, Input, Label } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

type SearchInputProps = {
    className?: string;
};

export default function SearchInput({ className }: SearchInputProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('search') ?? '';

    const [term, setTerm] = useState(search);

    useDebounce(
        () => {
            router.visit('', {
                method: 'get',
                data: { search: term, page: 1 },
                preserveState: true,
            });
        },
        300,
        [term],
    );

    return (
        <Field className={cn('relative w-60', className)}>
            <Label className="sr-only">Поиск</Label>
            <Input
                className="peer ease h-full w-full rounded-md border-2 border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-gray-500 hover:border-bright-salad focus:border-bright-salad focus:shadow focus:outline-none"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Поиск по разделу"
            />
            <Search className="ease absolute top-1/2 right-3 size-5 -translate-y-1/2 text-slate-400 transition duration-300 peer-focus:text-bright-salad" />
        </Field>
    );
}
