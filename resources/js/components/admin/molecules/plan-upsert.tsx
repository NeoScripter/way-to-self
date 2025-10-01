import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { Promo } from '@/types/model';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import EditBtn from '../atoms/edit-btn';
import SelectBox, { Option } from '../atoms/select-box';
import { TextWidget } from '../atoms/text-widget';

type PromoForm = {
    name: string;
    expires_at: string;
    discount: number;
    discount_type: string;
};

type PlanUpsertProps = {
    routeName: string;
    promo: Promo;
};

export default function PlanUpsert({ routeName, promo }: PlanUpsertProps) {
    const { options } = usePage<{ options: Option<string>[] }>().props;

    const [infoEdited, setInfoEdited] = useState(false);

    const {
        data,
        setData,
        patch,
        reset,
        clearErrors,
        errors,
        processing,
        recentlySuccessful,
    } = useForm<PromoForm>({
        name: promo.name,
        expires_at: promo.expires_at,
        discount: promo.discount,
        discount_type: promo.discount_type,
    });

    const handleCancelClick = () => {
        setInfoEdited((o) => !o);
        reset();
        clearErrors();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(routeName, {
            preserveScroll: true,
            onSuccess: () => {
                setInfoEdited(false);
                notify('Данные успешно изменены!');
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
                            edit={infoEdited}
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
                                required
                                placeholder="Название промокода"
                            />
                        </TextWidget>

                        <TextWidget
                            label="Дата окончания"
                            key="Дата окончания"
                            htmlFor="expires_at"
                            edit={infoEdited}
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
                                required
                            />
                        </TextWidget>

                        <TextWidget
                            label="Скидка"
                            key="Скидка"
                            htmlFor="discount"
                            edit={infoEdited}
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
                                required
                                min={0}
                            />
                        </TextWidget>

                        <TextWidget
                            label="Тип скидки"
                            key="Тип скидки"
                            htmlFor="discount_type"
                            edit={infoEdited}
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
                                disabled={!infoEdited}
                            />
                        </TextWidget>
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
        </div>
    );
}
