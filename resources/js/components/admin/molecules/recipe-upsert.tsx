import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import { Recipe } from '@/types/model';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import ImgInput from '../atoms/img-input';
import SelectBox, { Option } from '../atoms/select-box';
import TagPicker from '../atoms/tag-picker';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';
import VideoInput from '../atoms/video-input';
import InputLabel from '../atoms/input-label';
import InputError from '../atoms/input-error';
import { ActionBtns } from './action-btns';

type RecipeForm = {
    title: string;
    description: string;
    image: File | null;
    image_alt: string;
    duration: number;
    complexity: number;
    category_id: number | null;
    video: File | null;
    filters: number[];
};

type RecipeUpsertProps = {
    routeName: string;
    recipe?: Recipe;
};

export default function RecipeUpsert({ routeName, recipe }: RecipeUpsertProps) {
    const [isEdited, setInfoEdited] = useState(recipe == null);

    const { categories, filters } = usePage<{
        categories: Option<number>[];
        filters: Option<number>[];
    }>().props;

    const categoryId =
        recipe?.category?.id || categories.length > 0
            ? categories[0]?.value
            : null;

    const recipeFilters = recipe?.filters?.map((filter) => filter.id) || [];

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
    } = useForm<RecipeForm>({
        title: recipe?.title || '',
        description: recipe?.description || '',
        image: null,
        image_alt: recipe?.image?.alt || '',
        complexity: recipe?.complexity || 0,
        duration: recipe?.duration || 0,
        video: null,
        category_id: categoryId,
        filters: recipeFilters,
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
                            placeholder="Название"
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
                            placeholder="Описание"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </TextWidget>
                </div>

                <div className="grid max-w-200 gap-4 md:grid-cols-3 sm:grid-cols-2">
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

                    {data.category_id && (
                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="category_id">
                                Тип рецепта
                            </InputLabel>
                            <SelectBox
                                value={data.category_id}
                                onChange={(val) => setData('category_id', val)}
                                options={categories}
                                className="mt-1"
                                disabled={!isEdited}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.category_id}
                            />
                        </div>
                    )}
                </div>

                <div>
                    <ImgInput
                        key="image-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('image', file)}
                        src={recipe?.image?.path}
                        onAltChange={(val) => setData('image_alt', val)}
                        altError={errors.image_alt}
                        altText={data.image_alt}
                        error={errors.image}
                    />
                </div>
                <div>
                    <VideoInput
                        key="video-input"
                        progress={progress}
                        isEdited={isEdited}
                        onChange={(file) => setData('video', file)}
                        error={errors.video}
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

                <ActionBtns
                    isCreate={recipe == null}
                    edited={isEdited}
                    onCancel={handleCancelClick}
                    saved={recentlySuccessful}
                    loading={processing}
                />
            </form>
        </div>
    );
}
