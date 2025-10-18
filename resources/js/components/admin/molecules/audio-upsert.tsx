import Input from '@/components/shared/atoms/input';
import { Audio } from '@/types/model';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import AudioInput from '../atoms/audio-input';
import ImgInput from '../atoms/img-input';
import MarkdownEditor from '../atoms/markdown-editor';
import { Option } from '../atoms/select-box';
import TagPicker from '../atoms/tag-picker';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';
import { ActionBtns } from './action-btns';
import ExpandablePanel from './expandable-panel';

type AudioForm = {
    title: string;
    description: string;
    body: string;
    image: File | null;
    image_alt: string;
    duration: number;
    complexity: number;
    audio: File | null;
    filters: number[];
};

type AudioUpsertProps = {
    routeName: string;
    audio?: Audio;
};

export default function AudioUpsert({ routeName, audio }: AudioUpsertProps) {
    const [isEdited, setIsEdited] = useState(audio == null);

    const { filters } = usePage<{
        filters: Option<number>[];
    }>().props;

    const audioFilters = audio?.filters?.map((filter) => filter.id) || [];

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
    } = useForm<AudioForm>({
        title: audio?.title || '',
        description: audio?.description || '',
        body: audio?.body || '',
        image: null,
        image_alt: audio?.image?.alt || '',
        complexity: audio?.complexity || 0,
        duration: audio?.duration || 0,
        audio: null,
        filters: audioFilters,
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
                            placeholder="Название практики"
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
                            placeholder="Описание практики"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </TextWidget>
                </div>

                <div className="grid max-w-200 gap-4 sm:grid-cols-2">
                    <TextWidget
                        label="Продолжительность (мин)"
                        key="Продолжительность"
                        htmlFor="duration"
                        edit={isEdited}
                        error={errors.duration}
                        fallback={data.duration}
                    >
                        <Input
                            id="duration"
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
                        label="Сложность (1-10)"
                        key="Сложность (1-10)"
                        htmlFor="complexity"
                        edit={isEdited}
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
                </div>

                <div>
                    <ImgInput
                        key="image-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('image', file)}
                        src={audio?.image?.path}
                        onAltChange={(val) => setData('image_alt', val)}
                        altError={errors.image_alt}
                        altText={data.image_alt}
                        error={errors.image}
                    />
                </div>
                <div>
                    <AudioInput
                        label="Аудио"
                        key="audio-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('audio', file)}
                        error={errors.audio}
                    />
                </div>

                <TagPicker
                    className="mb-15"
                    value={data.filters}
                    disabled={!isEdited}
                    onChange={(v) => setData('filters', v)}
                    error={errors.filters}
                    options={filters}
                />

                <div>
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
                                        __html: audio?.html || '',
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

                <ActionBtns
                    isCreate={audio == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
