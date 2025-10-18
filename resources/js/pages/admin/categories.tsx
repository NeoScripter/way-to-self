import Input from '@/components/shared/atoms/input';
import InputError from '@/components/shared/atoms/input-error';
import capitalize from '@/lib/helpers/capitalize';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { FormEventHandler } from 'react';

type CategoriesProps = {
    namespace: string;
};

type Category = {
    id: number;
    name: string;
};

type CategoryForm = {
    name: string;
};

export default function Categories({ namespace }: CategoriesProps) {
    const { categories } = usePage<{
        categories: Category[];
    }>().props;

    const {
        data,
        post,
        setError,
        reset,
        clearErrors,
        setData,
        errors,
        processing,
    } = useForm<CategoryForm>({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.name === '') {
            setError('name', 'Введите название категории');
            window.setTimeout(() => clearErrors('name'), 5000);

            return;
        }

        post(route(`admin.${namespace}.categories.store`), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
            },
            onError: () => {
                window.setTimeout(() => clearErrors('name'), 5000);
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
                            Заголовок категории
                        </label>
                        <Input
                            id="name"
                            className="mt-1 block w-full text-left"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Заголовок категории"
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
                        Добавить категорию
                    </button>
                </div>
            </form>

            <div className="flex flex-wrap gap-2">
                {categories &&
                    categories.map((category) => (
                        <CategoryTag
                            key={category.id}
                            category={category}
                            namespace={namespace}
                        />
                    ))}
            </div>
        </div>
    );
}

type CategoryTagProps = {
    category: Category;
    namespace: string;
};

function CategoryTag({ category, namespace }: CategoryTagProps) {
    return (
        <div className="categorys-center flex gap-2 rounded-md bg-bright-salad px-2 py-1 text-white">
            <span className="">{capitalize(category.name)}</span>
            <Link
                method="delete"
                as="button"
                href={route(
                    `admin.${namespace}.categories.destroy`,
                    category.id,
                )}
                preserveScroll={true}
                preserveState={true}
                className="cursor-pointer text-gray-300 transition-colors hover:text-gray-400"
            >
                <X className="size-6" />
            </Link>
        </div>
    );
}
