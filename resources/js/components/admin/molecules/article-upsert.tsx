import Input from '@/components/shared/atoms/input';
import notify from '@/components/user/atoms/notify';
import { Article } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import ImgInput from '../atoms/img-input';
import MarkdownEditor from '../atoms/markdown-editor';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';
import ExpandablePanel from './expandable-panel';

type ArticleForm = {
    title: string;
    description: string;
    body: string;
    image: File | null;
    thumbnail: File | null;
    image_alt: string;
    thumbnail_alt: string;
};

type ArticleUpsertProps = {
    routeName: string;
    article?: Article;
};

export default function ArticleUpsert({
    routeName,
    article,
}: ArticleUpsertProps) {
    const [isEdited, setIsEdited] = useState(article == null);

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
    } = useForm<ArticleForm>({
        title: article?.title || '',
        description: article?.description || '',
        body: article?.body || '',
        image: null,
        thumbnail: null,
        image_alt: article?.image?.alt || '',
        thumbnail_alt: article?.thumbnail?.alt || '',
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
                notify('Сохранено!');
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
                        label="Название"
                        key="Название"
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
                            placeholder="Название статьи"
                        />
                    </TextWidget>

                    <TextWidget
                        label="Описание"
                        key="Описание"
                        htmlFor="description"
                        edit={isEdited}
                        error={errors.description}
                        fallback={data.description}
                        fbClass="block py-2 min-h-40 text-left"
                    >
                        <TextArea
                            id="description"
                            placeholder="Описание статьи"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </TextWidget>

                    <ExpandablePanel label="Содержание">
                        <TextWidget
                            label="Содержание"
                            key="Содержание"
                            htmlFor="body"
                            edit={isEdited}
                            error={errors.body}
                            fallback={
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: article?.html || '',
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
                    </ExpandablePanel>
                </div>

                <div>
                    <ImgInput
                        key="image-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('image', file)}
                        src={article?.image?.path}
                        onAltChange={(val) => setData('image_alt', val)}
                        altError={errors.image_alt}
                        altText={data.image_alt}
                        error={errors.image}
                    />
                </div>

                <div>
                    <ImgInput
                        key="thumbnail-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('thumbnail', file)}
                        src={article?.thumbnail?.path}
                        onAltChange={(val) => setData('thumbnail_alt', val)}
                        altError={errors.thumbnail_alt}
                        altText={data.thumbnail_alt}
                        label="Фото для превью"
                        error={errors.thumbnail}
                    />
                </div>

                <ActionBtns
                    isCreate={article == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
