import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';
import MarkdownEditor from '../atoms/markdown-editor';
import notify from '@/components/user/atoms/notify';

type BotForm = {
    tg_greet: string;
};

type BotUpsertProps = {
    tg_greet?: string;
    routeName: string;
};

export default function BotUpsert({ tg_greet, routeName }: BotUpsertProps) {
    const [isEdited, setIsEdited] = useState(tg_greet == null);

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
    } = useForm<BotForm>({
        tg_greet: tg_greet || '',
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
                notify("Сохранено");
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
                        htmlFor="tg_greet"
                        edit={isEdited}
                        error={errors.tg_greet}
                        fallback={data.tg_greet}
                        fbClass="block items-start py-2 min-h-40 text-left"
                    >
                        <MarkdownEditor
                            value={data.tg_greet}
                            onChange={(e) => setData('tg_greet', e)}
                        />
                    </TextWidget>
                </div>

                <ActionBtns
                    isCreate={tg_greet == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
