import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import { Block } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';

type BlockForm = {
    title: string;
    description: string;
};

type BlockUpsertProps = {
    block?: Block;
    routeName: string;
    onClick?: () => void;
};

export default function BlockUpsert({
    block,
    routeName,
    onClick,
}: BlockUpsertProps) {
    const [infoEdited, setInfoEdited] = useState(block == null);

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
    } = useForm<BlockForm>({
        title: block?.title || '',
        description: block?.description || '',
    });

    const handleCancelClick = () => {
        setInfoEdited((o) => !o);
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
                setInfoEdited(false);
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
                        label="Подзаголовок"
                        key="Подзаголовок"
                        htmlFor="title"
                        edit={infoEdited}
                        error={errors.title}
                        fallback={data.title}
                        fbClass="text-left justify-start"
                    >
                        <Input
                            id="title"
                            className="mt-1 block w-full text-left"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Подзаголовок программы"
                        />
                    </TextWidget>

                    <TextWidget
                        label="Текст"
                        key="Текст"
                        htmlFor="description"
                        edit={infoEdited}
                        error={errors.description}
                        fallback={data.description}
                        fbClass="block py-2 min-h-40 text-left"
                    >
                        <TextArea
                            id="description"
                            placeholder="Текст программы"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </TextWidget>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
                    {block != null && (
                        <EditBtn
                            onClick={handleCancelClick}
                            disabled={processing}
                            isEdited={infoEdited}
                        />
                    )}

                    <NeutralBtn
                        className="px-8 py-3 sm:px-12"
                        disabled={processing || !infoEdited}
                    >
                        {recentlySuccessful ? 'Сохранено' : 'Сохранить'}
                    </NeutralBtn>

                    {onClick && (
                        <NeutralBtn
                            onClick={onClick}
                            className="px-8 bg-red-700 hover:bg-red-600 py-3 sm:px-12"
                            disabled={!(processing || !infoEdited)}
                        >
                            Удалить
                        </NeutralBtn>
                    )}
                </div>
            </form>
        </div>
    );
}
