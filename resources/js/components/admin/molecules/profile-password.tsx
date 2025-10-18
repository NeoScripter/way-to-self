import NeutralBtn from '@/components/shared/atoms/neutral-btn';
import PasswordInput from '@/components/shared/atoms/password-input';
import notify from '@/components/user/atoms/notify';
import useToggle from '@/hooks/use-toggle';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import { z } from 'zod';
import { TextWidget } from '../atoms/text-widget';

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

    const [isEdited, setIsEdited] = useState(false);

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
                notify('Данные успешно изменены!');
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
                <form onSubmit={updatePassword}>
                    <div className="grid gap-6">
                        <TextWidget
                            label="Текущий пароль"
                            key="Текущий пароль"
                            htmlFor="current_password"
                            edit={true}
                            error={errors.current_password}
                            fallback={data.current_password}
                        >
                            <PasswordInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData('current_password', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md"
                                autoComplete="current-password"
                                placeholder="Текущий пароль"
                            />
                        </TextWidget>

                        <TextWidget
                            label="Новый пароль"
                            key="Новый пароль"
                            htmlFor="password"
                            edit={true}
                            error={errors.password}
                            fallback={data.password}
                        >
                            <PasswordInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md"
                                autoComplete="new-password"
                                placeholder="Новый пароль"
                            />
                        </TextWidget>

                        <TextWidget
                            label="Подтвердите новый пароль"
                            key="Подтвердите новый пароль"
                            htmlFor="password_confirmation"
                            edit={true}
                            error={errors.password_confirmation}
                            fallback={data.password_confirmation}
                        >
                            <PasswordInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                className="mt-1 block w-full rounded-md"
                                autoComplete="new-password"
                                placeholder="Подтвердите новый пароль"
                            />
                        </TextWidget>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-2 sm:gap-4">
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
