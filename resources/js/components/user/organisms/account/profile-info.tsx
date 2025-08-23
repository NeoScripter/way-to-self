import { User } from '@/types';
import { Button } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Input } from '@/components/user/atoms/input';
import InputError from '@/components/user/atoms/input-error';
import { Label } from '@/components/user/atoms/label';
import NeutralBtn from '@/components/user/atoms/neutral-btn';
import InputSpan from '../../atoms/input-span';

type ProfileForm = {
    name: string;
    surname: string;
    email: string;
    telegram: string;
};

export default function ProfileInfo() {
    const { auth } = usePage<{
        auth: { user: Pick<User, 'name' | 'surname' | 'email' | 'telegram'> };
    }>().props;

    const [infoEdited, setInfoEdited] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<ProfileForm>({
            name: auth.user.name,
            surname: auth.user.surname,
            email: auth.user.email,
            telegram: auth.user.telegram,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!infoEdited) return;

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <div className="pt-4">
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
                            onClick={() => setInfoEdited((o) => !o)}
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
