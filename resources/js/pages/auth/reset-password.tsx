import InputError from '@/components/shared/atoms/input-error';
import { Label } from '@/components/user/atoms/label';
import NeutralBtn from '@/components/shared/atoms/neutral-btn';
import PasswordInput from '@/components/shared/atoms/password-input';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AuthLayout from '@/layouts/auth/auth-layout';
import { cn } from '@/lib/utils';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import z from 'zod';
import Input from '@/components/shared/atoms/input';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const schema = z
    .object({
        token: z.string().min(1),
        email: z
            .email('Введите правильный email')
            .min(1, 'Введите email')
            .max(100, 'Email не должен превышать 100 символов'),
        password: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов')
            .max(100, 'Пароль не должен превышать 100 символов'),
        password_confirmation: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ['password_confirmation'],
        message: 'Пароли должны совпадать',
    });

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset, setError } =
        useForm<Required<ResetPasswordForm>>({
            token: token,
            email: email,
            password: '',
            password_confirmation: '',
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const result = schema.safeParse(data);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const inertiaErrors: Record<keyof ResetPasswordForm, string> = {
                email: fieldErrors.email?.[0] ?? '',
                token: fieldErrors.token?.[0] ?? '',
                password: fieldErrors.password?.[0] ?? '',
                password_confirmation:
                    fieldErrors.password_confirmation?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Reset password" />

            <h1 className="mb-7 flex flex-wrap justify-center gap-y-0.5 font-heading text-4xl text-white sm:mb-10 sm:max-w-full sm:text-6xl 2xl:text-8xl">
                <SpanHighlight
                    text="Восстановление"
                    className="mt-[0.1em] h-[0.6em] text-[4rem] sm:text-[6rem] 2xl:text-[6rem]"
                />
                <SpanHighlight
                    text="пароля"
                    className="mt-[0.1em] h-[0.6em] text-[4rem] sm:text-[6rem] 2xl:text-[6rem]"
                />
            </h1>

            <p className="mx-auto my-8 px-2 text-center text-sm tracking-wider text-balance text-white sm:w-4/5 sm:text-base">
                Введите ваш новый пароль
            </p>

            <form onSubmit={submit}>
                <div className="mx-auto grid w-full max-w-90 gap-3 px-2 sm:w-4/5 sm:max-w-full sm:gap-4 sm:px-0">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="email"
                            className="sr-only"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            className={cn(
                                'mt-1 block w-full sm:text-base',
                                errors.email && 'text-red-600',
                            )}
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError
                            message={errors.email}
                            className="mt-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="password"
                            className="sr-only"
                        >
                            Пароль
                        </Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            className={cn(
                                'mt-1 block w-full sm:text-base',
                                errors.password && 'text-red-600',
                            )}
                            autoFocus
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Пароль"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="password_confirmation"
                            className="sr-only"
                        >
                            Повторите пароль
                        </Label>
                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            className={cn(
                                'mt-1 block w-full sm:text-base',
                                errors.password_confirmation && 'text-red-600',
                            )}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            placeholder="Повторите пароль"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <NeutralBtn
                        type="submit"
                        tabIndex={4}
                        disabled={processing}
                        className="mx-auto mt-6 w-max"
                    >
                        {' '}
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        Сохранить пароль
                    </NeutralBtn>
                </div>
            </form>
        </AuthLayout>
    );
}
