import Input from '@/components/shared/atoms/input';
import capitalize from '@/lib/helpers/capitalize';
import { CategoryFilter } from '@/types/model';
import { Link, useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/shared/atoms/input-error';

type FilterForm = {
    title: string;
    name: string;
};

type FilterPanelProps = {
    items: CategoryFilter[];
    namespace: string;
    title: string;
};

export default function FilterPanel({
    items,
    title,
    namespace,
}: FilterPanelProps) {
    const {
        data,
        post,
        setError,
        reset,
        clearErrors,
        setData,
        errors,
        processing,
    } = useForm<FilterForm>({
        title: title,
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.name === '') {
            setError('name', 'Введите название фильтра');
            window.setTimeout(() => clearErrors('name'), 5000);

            return;
        }

        post(route(`admin.${namespace}.filters.store`), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="space-y-6">
            <form onSubmit={submit}>
                <div className="flex flex-wrap items-start gap-4">
                    <div className="">
                        <label
                            className="sr-only"
                            htmlFor="name"
                        >
                            Заголовок фильтра
                        </label>
                        <Input
                            id="name"
                            className="mt-1 block w-full text-left"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Заголовок фильтра"
                        />
                        <InputError
                            className="mt-2 text-xs sm:text-xs"
                            message={errors.name}
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="ease mt-1 flex cursor-pointer items-center gap-2 rounded-md bg-slate-800 px-3 py-3 pr-4 text-white transition-opacity duration-200 hover:opacity-90"
                    >
                        <Plus className="size-6" />
                        Добавить фильтр
                    </button>
                </div>
            </form>

            <div className="flex flex-wrap gap-2">
                {items &&
                    items
                        .filter((item) => item.name != null)
                        .map((item) => (
                            <Filter
                                key={item.id}
                                item={item}
                                namespace={namespace}
                            />
                        ))}
            </div>
        </div>
    );
}

type FilterProps = {
    item: CategoryFilter;
    namespace: string;
};

function Filter({ item, namespace }: FilterProps) {
    return (
        <div className="flex items-center gap-2 rounded-md bg-bright-salad px-2 py-1 text-white">
            <span className="">{capitalize(item.name)}</span>
            <Link
                method="delete"
                as="button"
                href={route(`admin.${namespace}.filters.destroy`, item.id)}
                preserveScroll={true}
                preserveState={true}
                className="cursor-pointer text-gray-300 transition-colors hover:text-gray-400"
            >
                <X className="size-6" />
            </Link>
        </div>
    );
}
