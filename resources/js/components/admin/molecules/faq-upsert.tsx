import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { cn } from '@/lib/utils';
import { FaqItem } from '@/types/model';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import MarkdownEditor from '../atoms/markdown-editor';
import { TextWidget } from '../atoms/text-widget';
import TrashBtn from '../atoms/trash-btn';

type FaqItemForm = {
    title: string;
    body: string;
};

type FaqItemUpsertProps = {
    routeName: string;
    faq?: FaqItem;
    onDeleteClick?: () => void;
    closeForm?: () => void;
};

export default function FaqItemUpsert({
    routeName,
    onDeleteClick,
    faq,
    closeForm,
}: FaqItemUpsertProps) {
    const [infoEdited, setInfoEdited] = useState(faq == null);

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
        recentlySuccessful,
    } = useForm<FaqItemForm>({
        title: faq?.title || '',
        body: faq?.body || '',
    });

    const handleCancelClick = () => {
        if (closeForm) {
            closeForm();
        } else {
            setInfoEdited((o) => !o);
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
                setInfoEdited(false);
                if (closeForm) {
                    closeForm();
                }
            },
            onError: () => {
                window.setTimeout(() => clearErrors(), 5000);
            },
        });
    };

    return (
        <div className="relative z-50">
            <form
                className="space-y-8"
                onSubmit={submit}
                encType="multipart/form-data"
            >
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <TextWidget
                            label="Вопрос"
                            key="Вопрос"
                            htmlFor="title"
                            edit={infoEdited}
                            error={errors.title}
                            fallback={data.title}
                            fbClass="text-left sm:text-lg md:text-lg shadow-none justify-start border-none"
                            labelClass={cn(infoEdited ? '' : 'hidden')}
                            className="flex-1 shrink-0"
                        >
                            <Input
                                id="title"
                                className="mt-1 block w-full text-left"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Вопрос"
                            />
                        </TextWidget>

                        {faq != null && !infoEdited && !isCreateForm && (
                            <div className="flex items-center justify-end gap-2">
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
                    </div>

                    <TextWidget
                        label="Ответ"
                        key="Ответ"
                        htmlFor="body"
                        edit={infoEdited}
                        error={errors.body}
                        fallback={
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: faq?.html || '',
                                }}
                                className="prose prose-sm block max-w-full border-none font-normal"
                            />
                        }
                        fbClass="block py-2 shadow-none min-h-20 h-auto text-left border-none px-3"
                        labelClass={cn(infoEdited ? '' : 'hidden')}
                        className={cn(infoEdited ? 'mt-4' : '')}
                    >
                        <MarkdownEditor
                            value={data.body}
                            onChange={(e) => setData('body', e)}
                        />
                    </TextWidget>
                </div>

                {infoEdited && (
                    <div className="mt-8 flex flex-col items-center justify-center gap-2 font-normal sm:flex-row sm:gap-4 md:mt-12 md:justify-end">
                        <EditBtn
                            onClick={handleCancelClick}
                            disabled={processing}
                            isEdited={infoEdited}
                        />
                        <NeutralBtn
                            className="px-8 py-3 sm:px-12"
                            disabled={processing || !infoEdited}
                        >
                            {recentlySuccessful ? 'Сохранено' : 'Сохранить'}
                        </NeutralBtn>
                    </div>
                )}
            </form>
        </div>
    );
}
