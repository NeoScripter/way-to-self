import Input from '@/components/admin/atoms/input';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';

type HomeForm = {
    title: string;
    description: string;
};

type HomeUpsertProps = {
    block?: ProgramHome;
    routeName: string;
    onClick?: () => void;
};

export default function HomeUpsert({
    block,
    routeName,
    onClick,
}: HomeUpsertProps) {
    const [isEdited, setIsEdited] = useState(block == null);

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
        title: block?.title || '',
        description: block?.description || '',
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
                        label="Подзаголовок"
                        key="Подзаголовок"
                        htmlFor="title"
                        edit={isEdited}
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
                        edit={isEdited}
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

                <ActionBtns
                    isCreate={block == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                    onDelete={onClick}
                />
            </form>
        </div>
    );
}
