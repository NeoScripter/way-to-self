import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { Exercise } from '@/types/model';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import ImgInput from '../atoms/img-input';
import InputError from '../atoms/input-error';
import InputLabel from '../atoms/input-label';
import MarkdownEditor from '../atoms/markdown-editor';
import SelectBox, { Option } from '../atoms/select-box';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';

type ExerciseForm = {
    title: string;
    description: string;
    body: string;
    image: File | null;
    image_alt: string;
    duration: number;
    complexity: number;
    video: File | null;
    category_id: number;
};

type ExerciseUpsertProps = {
    routeName: string;
    exercise?: Exercise;
};

export default function ExerciseUpsert({
    routeName,
    exercise,
}: ExerciseUpsertProps) {
    const [infoEdited, setInfoEdited] = useState(exercise == null);

    const { options } = usePage<{options: Option<number>[] }>().props;

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
    } = useForm<ExerciseForm>({
        title: exercise?.title || '',
        description: exercise?.description || '',
        body: exercise?.body || '',
        image: null,
        image_alt: exercise?.image?.alt || '',
        complexity: 0,
        duration: 0,
        video: null,
        category_id: exercise?.category?.id || 0,
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
                notify('Сохранено!');
                setDefaults();
                setInfoEdited(false);
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
                            placeholder="Описание упражнения"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </TextWidget>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <TextWidget
                        label="Скидка"
                        key="Скидка"
                        htmlFor="duration"
                        edit={infoEdited}
                        error={errors.duration}
                        fallback={data.duration}
                    >
                        <Input
                            id="complexity"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="mt-1 block w-full"
                            value={data.duration}
                            onChange={(e) =>
                                setData(
                                    'duration',
                                    !isNaN(Number(e.target.value))
                                        ? Number(e.target.value)
                                        : 0,
                                )
                            }
                        />
                    </TextWidget>

                    <TextWidget
                        label="Скидка"
                        key="Скидка"
                        htmlFor="complexity"
                        edit={infoEdited}
                        error={errors.complexity}
                        fallback={data.complexity}
                    >
                        <Input
                            id="complexity"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="mt-1 block w-full"
                            value={data.complexity}
                            onChange={(e) =>
                                setData(
                                    'complexity',
                                    !isNaN(Number(e.target.value))
                                        ? Number(e.target.value)
                                        : 0,
                                )
                            }
                        />
                    </TextWidget>

                    <div className="grid content-start gap-4">
                        <InputLabel htmlFor="category_id">
                            Тип упражнения
                        </InputLabel>
                        <SelectBox
                            value={data.category_id}
                            onChange={(val) => setData('category_id', val)}
                            options={options}
                            className="mt-1"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.category_id}
                        />
                    </div>
                </div>

                <div>
                    <ImgInput
                        key="image-input"
                        progress={progress}
                        isEdited={infoEdited}
                        onChange={(file) => setData('image', file)}
                        src={exercise?.image?.path}
                        onAltChange={(val) => setData('image_alt', val)}
                        altError={errors.image_alt}
                        altText={data.image_alt}
                        error={errors.image}
                    />
                </div>

                <div>
                    <TextWidget
                        label="Содержание"
                        key="Содержание"
                        htmlFor="body"
                        edit={infoEdited}
                        error={errors.body}
                        fallback={
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: exercise?.html || '',
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

                <div className="mt-16 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:mt-20">
                    {exercise != null && (
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
