import Input from '@/components/shared/atoms/input';
import NeutralBtn from '@/components/shared/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { Promo } from '@/types/model';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import EditBtn from '../atoms/edit-btn';
import SelectBox, { Option } from '../atoms/select-box';
import { TextWidget } from '../atoms/text-widget';

type PromoForm = {
    name: string;
    expires_at: string;
    discount: number;
    discount_type: string;
};

const schema = z
    .object({
        name: z
            .string()
            .min(1, 'Введите название промокода')
            .max(100, 'Название слишком длинное'),
        expires_at: z.string().min(1, 'Укажите дату окончания'),
        discount: z
            .number('Введите число')
            .min(0, 'Скидка не может быть меньше 0'),
        discount_type: z.enum(['percent', 'currency']),
    })
    .refine(
        (data) =>
            data.discount_type === 'currency' ||
            (data.discount <= 100 && data.discount >= 0),
        {
            message: 'Скидка в процентах должна быть от 0 до 100',
            path: ['discount'],
        },
    );

type EditPromoProps = {
    routeName: string;
    promo: Promo;
};

export default function EditPromo({ routeName, promo }: EditPromoProps) {
    const { options } = usePage<{ options: Option<string>[] }>().props;

    const [isEdited, setIsEdited] = useState(false);

    const {
        data,
        setData,
        setError,
        patch,
        reset,
        clearErrors,
        errors,
        setDefaults,
        processing,
        recentlySuccessful,
    } = useForm<PromoForm>({
        name: promo.name,
        expires_at: promo.expires_at,
        discount: promo.discount,
        discount_type: promo.discount_type,
    });

    const handleCancelClick = () => {
        setIsEdited((o) => !o);
        reset();
        clearErrors();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const result = schema.safeParse({
            ...data,
            discount: Number(data.discount),
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const inertiaErrors: Record<keyof PromoForm, string> = {
                name: fieldErrors.name?.[0] ?? '',
                expires_at: fieldErrors.expires_at?.[0] ?? '',
                discount: fieldErrors.discount?.[0] ?? '',
                discount_type: fieldErrors.discount_type?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        patch(routeName, {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                setIsEdited(false);
                notify('Данные успешно изменены!');
                setDefaults();
            },
        });
    };

    return (
        <div className="relative z-50 pt-4">
            <div className="mx-auto space-y-8">
                <form onSubmit={submit}>
                    <div className="grid gap-8 sm:grid-cols-2 md:gap-10">
                        <TextWidget
                            label="Название промокода"
                            key="Название промокода"
                            htmlFor="name"
                            edit={isEdited}
                            error={errors.name}
                            fallback={data.name}
                        >
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Название промокода"
                            />
                        </TextWidget>

                        <TextWidget
                            label="Дата окончания"
                            key="Дата окончания"
                            htmlFor="expires_at"
                            edit={isEdited}
                            error={errors.expires_at}
                            fallback={data.expires_at}
                        >
                            <Input
                                id="expires_at"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.expires_at}
                                onChange={(e) =>
                                    setData('expires_at', e.target.value)
                                }
                            />
                        </TextWidget>

                        <TextWidget
                            label="Скидка"
                            key="Скидка"
                            htmlFor="discount"
                            edit={isEdited}
                            error={errors.discount}
                            fallback={data.discount}
                        >
                            <Input
                                id="discount"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className="mt-1 block w-full"
                                value={data.discount}
                                onChange={(e) =>
                                    setData(
                                        'discount',
                                        !isNaN(Number(e.target.value))
                                            ? Number(e.target.value)
                                            : 0,
                                    )
                                }
                            />
                        </TextWidget>

                        <TextWidget
                            label="Тип скидки"
                            key="Тип скидки"
                            htmlFor="discount_type"
                            edit={isEdited}
                            error={errors.discount_type}
                            fallback={data.discount_type}
                        >
                            <SelectBox
                                value={data.discount_type}
                                onChange={(val) =>
                                    setData('discount_type', val)
                                }
                                options={options}
                                className="mt-1"
                                disabled={!isEdited}
                            />
                        </TextWidget>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:mt-20">
                        <EditBtn
                            onClick={handleCancelClick}
                            disabled={processing}
                            isEdited={isEdited}
                        />

                        <NeutralBtn
                            className="px-8 py-3 sm:px-12"
                            disabled={processing || !isEdited}
                        >
                            {recentlySuccessful ? 'Сохранено' : 'Сохранить'}
                        </NeutralBtn>
                    </div>
                </form>
            </div>
        </div>
    );
}
