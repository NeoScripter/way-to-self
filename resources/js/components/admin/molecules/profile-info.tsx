import Input from '@/components/admin/atoms/input';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import EditBtn from '../atoms/edit-btn';
import { TextWidget } from '../atoms/text-widget';

type ProfileForm = {
    name: string;
    surname: string;
    email: string;
    telegram: string;
};

export const schema = z.object({
    name: z
        .string()
        .min(1, 'Введите имя')
        .max(100, 'Имя не должно превышать 100 символов'),
    surname: z
        .string()
        .min(1, 'Введите фамилию')
        .max(100, 'Фамилия не должна превышать 100 символов'),
    email: z
        .string()
        .email('Введите правильный email')
        .max(100, 'Email не должен превышать 100 символов'),
    telegram: z
        .string()
        .regex(/^@/, 'Telegram должен начинаться с @')
        .min(2, 'Введите Telegram')
        .max(50, 'Telegram не должен превышать 50 символов'),
});

type ProfileInfoProps = {
    routeName: string;
    user: Pick<User, 'name' | 'surname' | 'email' | 'telegram'>;
};

export default function ProfileInfo({ routeName, user }: ProfileInfoProps) {
    const [infoEdited, setInfoEdited] = useState(false);

    const {
        data,
        setData,
        setError,
        patch,
        errors,
        processing,
        recentlySuccessful,
        reset,
        clearErrors,
    } = useForm<ProfileForm>({
        name: user.name,
        surname: user.surname,
        email: user.email,
        telegram: user.telegram,
    });

    const handleCancelClick = () => {
        setInfoEdited((o) => !o);
        reset();
        clearErrors();
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!infoEdited) return;

        const result = schema.safeParse(data);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const inertiaErrors: Record<keyof ProfileForm, string> = {
                email: fieldErrors.email?.[0] ?? '',
                name: fieldErrors.name?.[0] ?? '',
                surname: fieldErrors.surname?.[0] ?? '',
                telegram: fieldErrors.telegram?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        patch(routeName, {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                setInfoEdited(false);
                notify('Данные успешно изменены!');
                reset();
            },
        });
    };

    return (
        <div className="relative z-50 pt-4">
            <div className="mx-auto space-y-8">
                <form onSubmit={submit}>
                    <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                        <TextWidget
                            label="Имя"
                            key="Имя"
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
                                autoComplete="name"
                                placeholder="Имя"
                            />
                        </TextWidget>

                        <TextWidget
                            label="Фамилия"
                            htmlFor="surname"
                            edit={infoEdited}
                            error={errors.surname}
                            fallback={data.surname}
                        >
                            <Input
                                id="surname"
                                className="mt-1 block w-full"
                                value={data.surname}
                                onChange={(e) =>
                                    setData('surname', e.target.value)
                                }
                                autoComplete="surname"
                                placeholder="Фамилия"
                            />
                        </TextWidget>

                        <TextWidget
                            label="Email"
                            htmlFor="email"
                            edit={infoEdited}
                            error={errors.email}
                            fallback={data.email}
                        >
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                autoComplete="email"
                                placeholder="Email"
                            />
                        </TextWidget>

                        <TextWidget
                            label="Логин в телеграм"
                            htmlFor="telegram"
                            edit={infoEdited}
                            error={errors.telegram}
                            fallback={data.telegram}
                        >
                            <Input
                                id="telegram"
                                className="mt-1 block w-full"
                                value={data.telegram}
                                onChange={(e) =>
                                    setData('telegram', e.target.value)
                                }
                                autoComplete="telegram"
                                placeholder="Telegram"
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
