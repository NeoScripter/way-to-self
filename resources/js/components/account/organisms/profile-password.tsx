import DeleteUserDialog from '@/components/account/molecules/delete-user-dialog';
import InputError from '@/components/user/atoms/input-error';
import { Label } from '@/components/user/atoms/label';
import NeutralBtn from '@/components/user/atoms/neutral-btn';
import PasswordInput from '@/components/user/atoms/password-input';
import useToggle from '@/hooks/use-toggle';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { z } from 'zod';

type ProfileForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export const schema = z
    .object({
        current_password: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов')
            .max(100, 'Пароль не должен превышать 100 символов'),
        password: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов')
            .max(100, 'Пароль не должен превышать 100 символов')
            .regex(
                /[a-zа-я]/,
                'Пароль должен содержать хотя бы одну строчную букву',
            )
            .regex(
                /[A-ZА-Я]/,
                'Пароль должен содержать хотя бы одну заглавную букву',
            )
            .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру (0-9)')
            .regex(
                /[^a-zA-Zа-яА-Я0-9]/,
                'Пароль должен содержать хотя бы один спецсимвол',
            ),
        password_confirmation: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов')
            .max(100, 'Пароль не должен превышать 100 символов'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Пароли не совпадают',
        path: ['password_confirmation'],
    });

export default function ProfilePassword() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const [showModal, toggleModal] = useToggle(false);

    const {
        data,
        setData,
        setError,
        put,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm<ProfileForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        const result = schema.safeParse(data);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const inertiaErrors: Record<keyof ProfileForm, string> = {
                password: fieldErrors.password?.[0] ?? '',
                current_password: fieldErrors.current_password?.[0] ?? '',
                password_confirmation:
                    fieldErrors.password_confirmation?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <div className="relative z-50 pt-4">
            <div className="mx-auto max-w-177.5 space-y-6">
                <h3 className="mb-6 block font-heading font-medium sm:text-lg md:text-xl lg:mb-8 lg:text-2xl">
                    Изменение пароля
                </h3>

                <form onSubmit={updatePassword}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">
                                Текущий пароль
                            </Label>

                            <PasswordInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData('current_password', e.target.value)
                                }
                                className="mt-1 block w-full border-none"
                                autoComplete="current-password"
                                placeholder="Текущий пароль"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.current_password}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Новый пароль</Label>

                            <PasswordInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-1 block w-full border-none"
                                autoComplete="new-password"
                                placeholder="Новый пароль"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.password}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Подтвердите новый пароль
                            </Label>

                            <PasswordInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                className="mt-1 block w-full border-none"
                                autoComplete="new-password"
                                placeholder="Подтвердите новый пароль"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.password_confirmation}
                            />
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-between gap-2 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => toggleModal(true)}
                            className="flex cursor-pointer items-center gap-1 text-sm text-gray-500 sm:gap-2 sm:text-base md:text-lg"
                        >
                            <X className="size-5 text-gray-500 sm:size-6" />
                            Удалить аккаунт
                        </button>
                        <NeutralBtn
                            className="px-8 py-3 sm:px-12"
                            disabled={processing}
                        >
                            {recentlySuccessful ? 'Сохранено' : 'Сохранить'}
                        </NeutralBtn>
                    </div>
                </form>

                <DeleteUserDialog
                    show={showModal}
                    closeDialog={() => toggleModal(false)}
                />
            </div>
        </div>
    );
}
