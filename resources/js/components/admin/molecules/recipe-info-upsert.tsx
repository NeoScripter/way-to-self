import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import { RecipeInfo } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import ImgInput from '../atoms/img-input';
import LightBtn from '../atoms/light-btn';
import MarkdownEditor from '../atoms/markdown-editor';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';

type RecipeInfoForm = {
    title: string;
    body: string;
    order: number;
    image: File | null;
    image_alt: string;
};

type RecipeInfoUpsertProps = {
    info?: RecipeInfo;
    order?: number;
    routeName: string;
    onClick?: () => void;
};

export default function RecipeInfoUpsert({
    info,
    order = 0,
    routeName,
    onClick,
}: RecipeInfoUpsertProps) {
    const [isEdited, setInfoEdited] = useState(info == null);
    const [infoType, setInfoType] = useState<'text' | 'image'>(() =>
        info?.image != null ? 'image' : 'text',
    );

    const {
        data,
        post,
        reset,
        clearErrors,
        setData,
        errors,
        progress,
        processing,
        setDefaults,
        recentlySuccessful,
    } = useForm<RecipeInfoForm>({
        title: info?.title || '',
        order: info?.order || order,
        body: info?.body || '',
        image: null,
        image_alt: info?.image?.alt || '',
    });

    const handleCancelClick = () => {
        setInfoEdited((o) => !o);
        reset();
        clearErrors();
    };

    const handleSwitchType = (newType: 'image' | 'text') => {
        // reset('image', 'image_alt', 'body');
        setInfoType(newType);
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
                className="space-y-8 font-normal"
                onSubmit={submit}
            >
                <div className="grid gap-8 md:gap-10">
                    <TextWidget
                        label="Заголовок"
                        key="Заголовок"
                        htmlFor="title"
                        edit={isEdited}
                        error={errors.title}
                        fallback={data.title}
                        fbClass="text-left justify-start"
                    >
                        <Input
                            id="title"
                            className="info mt-1 w-full text-left"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Заголовок"
                        />
                    </TextWidget>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                        <LightBtn
                            className="max-w-40 justify-center"
                            onClick={() => handleSwitchType('image')}
                            isActive={infoType === 'image'}
                        >
                            Фотогорафия
                        </LightBtn>
                        <LightBtn
                            className="max-w-40 justify-center"
                            onClick={() => handleSwitchType('text')}
                            isActive={infoType === 'text'}
                        >
                            Текст
                        </LightBtn>
                    </div>
                    {infoType === 'image' ? (
                        <div>
                            <ImgInput
                                key="image-input"
                                progress={progress}
                                isEdited={isEdited}
                                onChange={(file) => setData('image', file)}
                                src={info?.image?.path}
                                onAltChange={(val) => setData('image_alt', val)}
                                altError={errors.image_alt}
                                altText={data.image_alt}
                                error={errors.image}
                            />
                        </div>
                    ) : (
                        <TextWidget
                            label="Содержание"
                            key="Содержание"
                            htmlFor="body"
                            edit={isEdited}
                            error={errors.body}
                            fallback={
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: info?.html || '',
                                    }}
                                    className="prose prose-sm block max-w-full"
                                />
                            }
                            fbClass="block py-2 min-h-40 h-auto text-left px-3"
                        >
                            <MarkdownEditor
                                value={data.body}
                                onChange={(e) => setData('body', e)}
                            />
                        </TextWidget>
                    )}
                </div>

                <ActionBtns
                    isCreate={info == null}
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
