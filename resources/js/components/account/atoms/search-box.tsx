import PrimaryBtn from '@/components/user/atoms/primary-btn';
import { cn } from '@/lib/utils';
import { Field, Input, Label } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { Check, Search } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

type SearchBoxProps = {
    className?: string;
    routeName: string;
};

type SyncSearchEvent = CustomEvent<string>;

export default function SearchBox({ className, routeName }: SearchBoxProps) {
    const [term, setTerm] = useState('');

    useEffect(() => {
        const handleClearSearch = () => {
            setTerm('');
        };

        const handleSyncSearch = (e: Event) => {
            const customEvent = e as SyncSearchEvent;
            setTerm(customEvent.detail);
        };

        document.addEventListener('clearSearch', handleClearSearch);
        document.addEventListener('syncSearch', handleSyncSearch);

        return () => {
            document.removeEventListener('clearSearch', handleClearSearch);
            document.removeEventListener('syncSearch', handleSyncSearch);
        };
    }, []);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.get(
            route(routeName),
            { search: term },
            { preserveState: true, replace: true },
        );
    };

    return (
        <form
            onSubmit={handleSearch}
            className={cn(
                'mx-auto my-5 flex max-w-175 gap-3 sm:gap-5',
                className,
            )}
        >
            <Field className="relative w-full">
                <Label className="sr-only">Поиск</Label>
                <Input
                    className="peer ease h-full w-full rounded-full border-2 border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-gray-500 hover:border-bright-salad focus:border-bright-salad focus:shadow focus:outline-none sm:text-base xl:text-lg"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Поиск по разделу"
                />
                <Search className="ease absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate-500 transition duration-300 peer-focus:text-bright-salad" />
            </Field>

            <PrimaryBtn
                type="submit"
                className="flex size-11 shrink-0 items-center justify-center bg-bright-salad p-1 shadow-bright-salad/50 hover:bg-lime-500 focus:ring-4 focus:ring-lime-700/50 sm:size-auto sm:px-12 xl:text-lg"
            >
                <Check className="size-4/5 text-white sm:hidden" />
                <span className="hidden sm:block">Найти</span>
            </PrimaryBtn>
        </form>
    );
}
