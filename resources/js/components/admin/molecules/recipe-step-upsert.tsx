import { RecipeStep } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import ImgInput from '../atoms/img-input';
import MarkdownEditor from '../atoms/markdown-editor';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';

type RecipeStepForm = {
    body: string;
    order: number;
    image: File | null;
    image_alt: string;
};

type RecipeStepUpsertProps = {
    step?: RecipeStep;
    order?: number;
    routeName: string;
    onClick?: () => void;
};

export default function RecipeStepUpsert({
    step,
    order = 0,
    routeName,
    onClick,
}: RecipeStepUpsertProps) {
    const [isEdited, setEdited] = useState(step == null);

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
    } = useForm<RecipeStepForm>({
        order: step?.order || order,
        body: step?.body || '',
        image: null,
        image_alt: step?.image?.alt || '',
    });

    const handleCancelClick = () => {
        setEdited((o) => !o);
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
                setEdited(false);
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
                    <div>
                        <ImgInput
                            key="image-input"
                            progress={progress}
                            isEdited={isEdited}
                            onChange={(file) => setData('image', file)}
                            src={step?.image?.path}
                            onAltChange={(val) => setData('image_alt', val)}
                            altError={errors.image_alt}
                            altText={data.image_alt}
                            error={errors.image}
                        />
                    </div>
                    <TextWidget
                        label="Содержание"
                        key="Содержание"
                        htmlFor="body"
                        edit={isEdited}
                        error={errors.body}
                        fallback={
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: step?.html || '',
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
                </div>

                <ActionBtns
                    isCreate={step == null}
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
