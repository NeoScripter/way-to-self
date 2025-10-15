import { HomeEntry } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';

type HomeForm = {
    description: string;
};

type HomeUpsertProps = {
    entry?: HomeEntry;
    routeName: string;
};

export default function HomeUpsert({ entry, routeName }: HomeUpsertProps) {
    const [isEdited, setIsEdited] = useState(entry == null);

    const {
        data,
        post,
        reset,
        clearErrors,
        setData,
        errors,
        processing,
        setDefaults,
        recentlySuccessful,
    } = useForm<HomeForm>({
        description: entry?.description || '',
    });

    const handleCancelClick = () => {
        setIsEdited((o) => !o);
        reset();
        clearErrors();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(routeName, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setDefaults();
                setIsEdited(false);
            },
        });
    };

    return (
        <div className="relative z-50 py-4">
            <form
                className="space-y-8"
                onSubmit={submit}
            >
                <div className="grid gap-8 font-normal md:gap-10">
                    <TextWidget
                        label="Текст"
                        key="Текст"
                        htmlFor="description"
                        edit={isEdited}
                        error={errors.description}
                        fallback={data.description}
                        fbClass="entry items-start py-2 min-h-40 text-left"
                    >
                        <TextArea
                            id="description"
                            placeholder="Текст"
                            className="entry mt-1 w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </TextWidget>
                </div>

                <ActionBtns
                    isCreate={entry == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
