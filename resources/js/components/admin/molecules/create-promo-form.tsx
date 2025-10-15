import Input from '@/components/admin/atoms/input';
import InputError from '@/components/admin/atoms/input-error';
import InputLabel from '@/components/admin/atoms/input-label';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { z } from 'zod';
import SelectBox, { Option } from '../atoms/select-box';

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

type CreatePromoFormProps = {
    routeName: string;
};

export default function CreatePromoForm({ routeName }: CreatePromoFormProps) {
    const { options } = usePage<{ options: Option<string>[] }>().props;
    const {
        data,
        setData,
        setError,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm<PromoForm>({
        name: '',
        expires_at: '',
        discount: 0,
        discount_type: 'percent',
    });

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

        post(routeName);
    };

    return (
        <div className="relative z-50 pt-4">
            <div className="mx-auto space-y-8">
                <form onSubmit={submit}>
                    <div className="grid gap-8 sm:grid-cols-2 md:gap-10">
                        {/* Название промокода */}
                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="name">
                                Название промокода
                            </InputLabel>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                                placeholder="Название промокода"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        {/* Дата окончания */}
                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="expires_at">
                                Дата окончания
                            </InputLabel>
                            <Input
                                id="expires_at"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.expires_at}
                                onChange={(e) =>
                                    setData('expires_at', e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.expires_at}
                            />
                        </div>

                        {/* Скидка */}
                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="discount">Скидка</InputLabel>
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
                                required
                                min={0}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.discount}
                            />
                        </div>

                        {/* Тип скидки */}
                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="discount_type">
                                Тип скидки
                            </InputLabel>
                            <SelectBox
                                value={data.discount_type}
                                onChange={(val) =>
                                    setData('discount_type', val)
                                }
                                options={options}
                                className="mt-1"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.discount_type}
                            />
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:mt-20">
                        <NeutralBtn
                            className="px-8 py-3 sm:px-12"
                            disabled={processing}
                        >
                            {recentlySuccessful ? 'Сохранено' : 'Сохранить'}
                        </NeutralBtn>
                    </div>
                </form>
            </div>
        </div>
    );
}
