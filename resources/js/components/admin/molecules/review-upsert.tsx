import Input from '@/components/admin/atoms/input';
import { Review } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import ImgInput from '../atoms/img-input';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';
import TextArea from '../atoms/text-area';

type ReviewForm = {
    author: string;
    image: File | null;
    image_alt: string;
    body: string;
};

type ReviewUpsertProps = {
    routeName: string;
    review?: Review;
};

export default function ReviewUpsert({ routeName, review }: ReviewUpsertProps) {
    const [isEdited, setIsEdited] = useState(review == null);

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
    } = useForm<ReviewForm>({
        author: review?.author || '',
        image: null,
        image_alt: review?.image?.alt || '',
        body: review?.body || '',
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
        <div className="relative z-50 pt-4">
            <form
                className="space-y-8"
                onSubmit={submit}
                encType="multipart/form-data"
            >
                <div className="grid gap-8 md:gap-10">
                    <TextWidget
                        label="Имя"
                        key="Имя"
                        htmlFor="author"
                        edit={isEdited}
                        error={errors.author}
                        fallback={data.author}
                        fbClass="text-left justify-start"
                    >
                        <Input
                            id="author"
                            className="mt-1 block w-full text-left"
                            value={data.author}
                            onChange={(e) => setData('author', e.target.value)}
                            placeholder="Имя"
                        />
                    </TextWidget>

                    <TextWidget
                        label="Отзыв"
                        key="Отзыв"
                        htmlFor="body"
                        edit={isEdited}
                        error={errors.body}
                        fallback={data.body}
                        fbClass="block py-2 min-h-40 text-left"
                    >
                        <TextArea
                            id="body"
                            value={data.body}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('body', e.target.value)}
                            placeholder="Отзыв"
                        />
                    </TextWidget>
                </div>

                <div className="pb-8">
                    <ImgInput
                        key="image-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('image', file)}
                        src={review?.image?.path}
                        onAltChange={(val) => setData('image_alt', val)}
                        altError={errors.image_alt}
                        altText={data.image_alt}
                        error={errors.image}
                    />
                </div>

                <ActionBtns
                    isCreate={review == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
