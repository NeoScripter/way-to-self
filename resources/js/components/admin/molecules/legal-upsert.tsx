import notify from '@/components/user/atoms/notify';
import { LegalInfo } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import MarkdownEditor from '../atoms/markdown-editor';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';
import Input from '@/components/shared/atoms/input';

type LegalForm = {
    title: string;
    body: string;
};

type LegalUpsertProps = {
    info?: LegalInfo;
    routeName: string;
};

export default function LegalUpsert({ info, routeName }: LegalUpsertProps) {
    const [isEdited, setIsEdited] = useState(info == null);

    const {
        data,
        patch,
        reset,
        clearErrors,
        setData,
        errors,
        processing,
        setDefaults,
        recentlySuccessful,
    } = useForm<LegalForm>({
        title: info?.title || '',
        body: info?.body || '',
    });

    const handleCancelClick = () => {
        setIsEdited((o) => !o);
        reset();
        clearErrors();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(routeName, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setDefaults();
                notify('Сохранено');
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
                        label="Заголовок"
                        key="Заголовок"
                        htmlFor="title"
                        edit={isEdited}
                        error={errors.title}
                        fallback={data.title}
                        fbClass="block text-left justify-start items-center"
                    >
                        <Input
                            id="title"
                            className="mt-1 block w-full text-left"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Заголовок"
                        />
                    </TextWidget>

                    <TextWidget
                        label="Текст"
                        key="Текст"
                        htmlFor="info"
                        edit={isEdited}
                        error={errors.body}
                        fallback={data.body}
                        fbClass="block items-start py-2 min-h-40 text-left"
                    >
                        <MarkdownEditor
                            value={data.body}
                            onChange={(e) => setData('body', e)}
                        />
                    </TextWidget>
                </div>

                <ActionBtns
                    isCreate={info == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
