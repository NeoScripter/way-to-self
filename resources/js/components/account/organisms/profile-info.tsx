import { Input } from '@/components/user/atoms/input';
import InputError from '@/components/user/atoms/input-error';
import InputSpan from '@/components/user/atoms/input-span';
import { Label } from '@/components/user/atoms/label';
import NeutralBtn from '@/components/user/atoms/neutral-btn';
import notify from '@/components/user/atoms/notify';
import { User } from '@/types';
import { Button } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';

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

export default function ProfileInfo() {
    const { auth } = usePage<{
        auth: { user: Pick<User, 'name' | 'surname' | 'email' | 'telegram'> };
    }>().props;

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
        name: auth.user.name,
        surname: auth.user.surname,
        email: auth.user.email,
        telegram: auth.user.telegram,
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

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setInfoEdited(false);
                notify('Данные успешно изменены!');
            },
        });
    };

    return (
        <div className="relative z-50 pt-4">
            <div className="mx-auto max-w-177.5 space-y-6">
                <h3 className="mb-6 block font-heading font-medium sm:text-lg md:text-xl lg:mb-8 lg:text-2xl">
                    Данные пользователя
                </h3>

                <form onSubmit={submit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Имя</Label>

                            {infoEdited ? (
                                <Input
                                    id="name"
                                    className="mt-1 block w-full border-none"
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
                        <div className="grid gap-2">
                            <Label htmlFor="name">Фамилия</Label>

                            {infoEdited ? (
                                <Input
                                    id="surname"
                                    className="mt-1 block w-full border-none"
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

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>

                            {infoEdited ? (
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full border-none"
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

                        <div className="grid gap-2">
                            <Label htmlFor="telegram">Логин в телеграм</Label>

                            {infoEdited ? (
                                <Input
                                    id="telegram"
                                    type="telegram"
                                    className="mt-1 block w-full border-none"
                                    value={data.telegram}
                                    onChange={(e) =>
                                        setData('telegram', e.target.value)
                                    }
                                    required
                                    autoComplete="telegram"
                                    placeholder="telegram"
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

                    <div className="mt-8 flex items-center justify-end gap-2 sm:gap-4">
                        <Button
                            type="button"
                            onClick={handleCancelClick}
                            className="cursor-pointer rounded-full px-6 py-3 text-sm sm:text-base"
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
