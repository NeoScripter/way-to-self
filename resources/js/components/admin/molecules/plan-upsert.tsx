import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { Plan } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import ImgInput from '../atoms/img-input';
import TextArea from '../atoms/text-area';
import { TextWidget } from '../atoms/text-widget';

type PlanForm = {
    title: string;
    description: string;
    price: number;
    tier_count: number;
    image: File | null;
    alt: string;
};

type PlanUpsertProps = {
    routeName: string;
    plan: Plan;
};

export default function PlanUpsert({ routeName, plan }: PlanUpsertProps) {
    const [infoEdited, setInfoEdited] = useState(false);

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
    } = useForm<PlanForm>({
        title: plan.title || '',
        description: plan.description || '',
        price: plan.price || 0,
        tier_count: plan.tier_count || 0,
        image: null,
        alt: plan.image?.alt || '',
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
            onSuccess: () => {
                setInfoEdited(false);
                notify('Данные успешно изменены!');
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
                        textleft={true}
                    >
                        <Input
                            id="title"
                            className="mt-1 block w-full text-left"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            placeholder="Название промокода"
                        />
                    </TextWidget>

                    <TextWidget
                        label="Описание"
                        key="Описание"
                        htmlFor="description"
                        edit={infoEdited}
                        error={errors.description}
                        fallback={data.description}
                        textarea={true}
                    >
                        <TextArea
                            id="description"
                            className="mt-1 block w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            required
                        />
                    </TextWidget>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 md:gap-10">
                    <TextWidget
                        label="Цена"
                        key="Цена"
                        htmlFor="price"
                        edit={infoEdited}
                        error={errors.price}
                        fallback={data.price}
                        textleft={true}
                    >
                        <Input
                            id="price"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="mt-1 block w-full text-left"
                            value={data.price}
                            onChange={(e) =>
                                setData(
                                    'price',
                                    !isNaN(Number(e.target.value))
                                        ? Number(e.target.value)
                                        : 0,
                                )
                            }
                            required
                            min={0}
                        />
                    </TextWidget>

                    <TextWidget
                        label="Количество разделов"
                        key="Количество разделов"
                        htmlFor="tier_count"
                        edit={infoEdited}
                        error={errors.tier_count}
                        fallback={data.tier_count}
                        textleft={true}
                    >
                        <Input
                            id="price"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="mt-1 block w-full text-left"
                            value={data.tier_count}
                            onChange={(e) =>
                                setData(
                                    'price',
                                    !isNaN(Number(e.target.value))
                                        ? Number(e.target.value)
                                        : 0,
                                )
                            }
                            required
                            min={0}
                        />
                    </TextWidget>
                </div>

                <div>
                    <ImgInput
                        progress={progress}
                        isEdited={infoEdited}
                        onChange={(file) => setData('image', file)}
                        src={plan.image?.path}
                        onAltChange={(val) => setData('alt', val)}
                        altError={errors.alt}
                        altText={data.alt}
                    />
                </div>

                <div className="mt-16 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:mt-20">
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
            </form>
        </div>
    );
}
