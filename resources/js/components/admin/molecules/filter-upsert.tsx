import Input from '@/components/admin/atoms/input';
import notify from '@/components/user/atoms/notify';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import InputError from '../atoms/input-error';
import InputSpan from '../atoms/input-span';
import TrashBtn from '../atoms/trash-btn';

type FilterForm = {
    title: string;
};

type FilterUpsertProps = {
    routeName: string;
    filter?: string;
    onDeleteClick?: () => void;
    closeForm?: () => void;
};

export default function FilterUpsert({
    routeName,
    onDeleteClick,
    filter,
    closeForm,
}: FilterUpsertProps) {
    const [isEdited, setIsEdited] = useState(filter == null);

    const isCreateForm = onDeleteClick == null;

    const {
        data,
        post,
        reset,
        clearErrors,
        setData,
        errors,
        processing,
        setDefaults,
    } = useForm<FilterForm>({
        title: filter || '',
    });

    const handleCancelClick = () => {
        if (closeForm) {
            closeForm();
        } else {
            setIsEdited((o) => !o);
        }
        reset();
        clearErrors();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(routeName, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                notify('Сохранено!');
                setDefaults();
                setIsEdited(false);
                if (closeForm) {
                    closeForm();
                }
            },
        });
    };

    return (
        <div className="relative z-50">
            <form
                className="space-y-8"
                onSubmit={submit}
            >
                <div className="flex [width:min(100%,_500px)] items-center justify-between gap-8">
                    <div className="flex-1">
                        <label
                            className="sr-only"
                            htmlFor="title"
                        >
                            Заголовок фильтра
                        </label>
                        {isEdited ? (
                            <Input
                                id="title"
                                className="mt-1 block w-full text-left"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Заголовок фильтра"
                            />
                        ) : (
                            <InputSpan className="justify-start border-none text-left font-bold uppercase shadow-none sm:text-lg md:text-lg">
                                {data.title}
                            </InputSpan>
                        )}
                        <InputError
                            className="mt-2 text-xs sm:text-xs"
                            message={errors.title}
                        />
                    </div>

                    {!isEdited && !isCreateForm && (
                        <div className="flex shrink-0 items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancelClick}
                                disabled={processing}
                                className="ease cursor-pointer text-dark-green transition-colors duration-200 hover:text-light-swamp"
                            >
                                <PencilIcon className="size-6" />
                            </button>
                            <TrashBtn
                                onClick={onDeleteClick}
                                size="size-7"
                            />
                        </div>
                    )}

                    {isEdited && (
                        <div className="flex shrink-0 items-center justify-end gap-2">
                            <button
                                disabled={processing || !isEdited}
                                className="ease cursor-pointer text-dark-green transition-colors duration-200 hover:text-light-swamp"
                            >
                                <Save className="size-7 text-bright-salad transition-colors duration-200 hover:text-lime-700" />
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelClick}
                                disabled={processing}
                                className="ease cursor-pointer text-dark-green transition-colors duration-200 hover:text-light-swamp"
                            >
                                <X className="size-7 text-gray-500 transition-colors duration-200 hover:text-gray-700" />
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
