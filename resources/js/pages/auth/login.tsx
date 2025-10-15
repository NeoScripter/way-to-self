import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/shared/atoms/input-error';
import TextLink from '@/components/shared/atoms/text-link';
import { Checkbox } from '@/components/user/atoms/checkbox';
import { Input } from '@/components/user/atoms/input';
import { Label } from '@/components/user/atoms/label';
import NeutralBtn from '@/components/user/atoms/neutral-btn';
import PasswordInput from '@/components/user/atoms/password-input';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AuthLayout from '@/layouts/auth/auth-layout';
import { cn } from '@/lib/utils';
import { z } from 'zod';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const schema = z.object({
    email: z
        .email('Введите правильный email')
        .min(1, 'Введите email')
        .max(100, 'Email не должен превышать 100 символов'),
    password: z
        .string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .max(100, 'Пароль не должен превышать 100 символов'),
    remember: z.boolean().default(false),
});

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset, setError } =
        useForm<Required<LoginForm>>({
            email: '',
            password: '',
            remember: false,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const result = schema.safeParse(data);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const inertiaErrors: Record<keyof LoginForm, string> = {
                email: fieldErrors.email?.[0] ?? '',
                password: fieldErrors.password?.[0] ?? '',
                remember: fieldErrors.remember?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        post(route('login'), {
            onSuccess: () => router.flushAll(),
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Вход" />

            <h1 className="mb-7 flex flex-wrap justify-center gap-y-0.5 font-heading text-4xl text-white sm:mb-10 sm:max-w-full sm:text-6xl 2xl:text-8xl">
                <SpanHighlight
                    text="Добро"
                    className="mt-[0.1em] h-[0.6em] text-[4rem] sm:text-[6rem] 2xl:text-[6rem]"
                />
                <SpanHighlight
                    text="пожаловать!"
                    className="mt-[0.1em] h-[0.6em] text-[4rem] sm:text-[6rem] 2xl:text-[6rem]"
                />
            </h1>

            <p className="mx-auto my-8 w-4/5 text-center text-sm tracking-wider text-balance text-white sm:text-base">
                Доступ к ресурсу возможен только для пользователей, оформивших
                <TextLink
                    href={route('tiers.index')}
                    className="ml-1"
                >
                    подписку.
                </TextLink>
            </p>
            <p className="mx-auto my-8 w-4/5 text-center text-sm tracking-wider text-balance text-white sm:text-base">
                <TextLink
                    href={route('dev.login')}
                    className="ml-1"
                    onClick={() => router.flushAll()}
                >
                    Вход (только для Ильи)
                </TextLink>
            </p>

            <form
                className="flex flex-col gap-6 text-text-black"
                onSubmit={submit}
            >
                <div className="mx-auto grid w-full max-w-90 gap-3 px-2 sm:w-4/5 sm:max-w-full sm:gap-4 sm:px-0">
                    <div className="grid gap-2">
                        <Label
                            className="sr-only"
                            htmlFor="email"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className={cn(
                                'sm:text-base',
                                errors.email && 'text-red-600',
                            )}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            className="sr-only"
                            htmlFor="password"
                        >
                            Пароль
                        </Label>
                        <PasswordInput
                            id="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Password"
                            className={cn(
                                'sm:text-base',
                                errors.password && 'text-red-600',
                            )}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-white">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() =>
                                    setData('remember', !data.remember)
                                }
                                tabIndex={3}
                            />
                            <Label
                                className="text-xs sm:text-sm"
                                htmlFor="remember"
                            >
                                Запомнить меня
                            </Label>
                        </div>
                        {canResetPassword && (
                            <TextLink
                                href={route('password.request')}
                                className="mr-2 text-xs font-medium sm:text-sm"
                                tabIndex={5}
                            >
                                Забыли пароль?
                            </TextLink>
                        )}
                    </div>

                    <NeutralBtn
                        type="submit"
                        tabIndex={4}
                        disabled={processing}
                        className="mx-auto mt-6 w-30"
                    >
                        {' '}
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        Войти
                    </NeutralBtn>
                </div>
            </form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
