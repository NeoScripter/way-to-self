import Input from '@/components/admin/atoms/input';
import InputError from '@/components/admin/atoms/input-error';
import InputSpan from '@/components/admin/atoms/input-span';
import NeutralBtn from '@/components/admin/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { User } from '@/types';
import { Button } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import InputLabel from '../atoms/input-label';

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
                    <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="name">Имя</InputLabel>

                            {infoEdited ? (
                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    autoComplete="name"
                                    placeholder="Ваше имя"
                                />
                            ) : (
                                <InputSpan>{data.name}</InputSpan>
                            )}

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="name">Фамилия</InputLabel>

                            {infoEdited ? (
                                <Input
                                    id="surname"
                                    className="mt-1 block w-full"
                                    value={data.surname}
                                    onChange={(e) =>
                                        setData('surname', e.target.value)
                                    }
                                    required
                                    autoComplete="surname"
                                    placeholder="Ваша фамилия"
                                />
                            ) : (
                                <InputSpan>{data.surname}</InputSpan>
                            )}

                            <InputError
                                className="mt-2"
                                message={errors.surname}
                            />
                        </div>

                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="email">Email</InputLabel>

                            {infoEdited ? (
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    autoComplete="email"
                                    placeholder="Email"
                                />
                            ) : (
                                <InputSpan>{data.email}</InputSpan>
                            )}

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        <div className="grid content-start gap-4">
                            <InputLabel htmlFor="telegram">
                                Логин в телеграм
                            </InputLabel>

                            {infoEdited ? (
                                <Input
                                    id="telegram"
                                    type="telegram"
                                    className="mt-1 block w-full"
                                    value={data.telegram}
                                    onChange={(e) =>
                                        setData('telegram', e.target.value)
                                    }
                                    required
                                    autoComplete="telegram"
                                    placeholder="Telegram"
                                />
                            ) : (
                                <InputSpan>{data.telegram}</InputSpan>
                            )}
                            <InputError
                                className="mt-2"
                                message={errors.telegram}
                            />
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:mt-20">
                        <Button
                            type="button"
                            onClick={handleCancelClick}
                            className="order-2 cursor-pointer rounded-lg px-6 py-3 text-sm sm:order-0 sm:text-base"
                            disabled={processing}
                        >
                            {infoEdited ? 'Отменить' : 'Редактировать'}
                        </Button>

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
