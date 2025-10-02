import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { Article } from '@/types/model';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import ImgInput from '../atoms/img-input';
import MarkdownEditor from '../atoms/markdown-editor';
import SelectBox, { Option } from '../atoms/select-box';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';

type ArticleForm = {
    title: string;
    description: string;
    body: string;
    type: string;
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
    const { options } = usePage<{ options: Option<string>[] }>().props;

    const [infoEdited, setInfoEdited] = useState(article == null);

    const {
        data,
        post,
        reset,
        clearErrors,
        setData,
        errors,
        progress,
        processing,
        recentlySuccessful,
    } = useForm<ArticleForm>({
        title: article?.title || '',
        description: article?.description || '',
        body: article?.body || '',
        type: article?.type || options[0].value,
        image: null,
        thumbnail: null,
        image_alt: article?.image?.alt || '',
        thumbnail_alt: article?.thumbnail?.alt || '',
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
            preserveState: false,
            onSuccess: () => {
                setInfoEdited(false);
                notify('Сохранено!');
                reset();
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
                            required
                            placeholder="Название статьи"
                        />
                    </TextWidget>

                    <TextWidget
                        label="Описание"
                        key="Описание"
                        htmlFor="description"
                        edit={infoEdited}
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

                    <TextWidget
                        label="Описание"
                        key="Описание"
                        htmlFor="body"
                        edit={infoEdited}
                        error={errors.body}
                        fallback={article?.html}
                        fbClass="block py-2 min-h-40 text-left"
                    >
                        <MarkdownEditor
                            value={data.body}
                            onChange={(e) => setData('body', e)}
                        />
                    </TextWidget>

                    <TextWidget
                        label="Тип статьи"
                        key="Тип статьи"
                        htmlFor="type"
                        edit={infoEdited}
                        error={errors.type}
                        fallback={
                            options.find((opt) => opt.value === data.type)
                                ?.label
                        }
                        fbClass="max-w-100"
                    >
                        <SelectBox
                            value={data.type}
                            onChange={(val) => setData('type', val)}
                            options={options}
                            className="mt-1 max-w-100"
                            disabled={!infoEdited}
                        />
                    </TextWidget>
                </div>

                <div>
                    <ImgInput
                        key="image-input"
                        progress={progress}
                        isEdited={infoEdited}
                        onChange={(file) => setData('image', file)}
                        src={article?.image?.path}
                        onAltChange={(val) => setData('image_alt', val)}
                        altError={errors.image_alt}
                        altText={data.image_alt}
                    />
                </div>

                <div>
                    <ImgInput
                        key="thumbnail-input"
                        progress={progress}
                        isEdited={infoEdited}
                        onChange={(file) => setData('thumbnail', file)}
                        src={article?.thumbnail?.path}
                        onAltChange={(val) => setData('thumbnail_alt', val)}
                        altError={errors.thumbnail_alt}
                        altText={data.thumbnail_alt}
                    />
                </div>

                <div className="mt-16 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:mt-20">
                    {article != null && (
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
                </div>
            </form>
        </div>
    );
}
