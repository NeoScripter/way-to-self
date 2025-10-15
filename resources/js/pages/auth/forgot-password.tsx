// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/shared/atoms/text-link';
import { Input } from '@/components/user/atoms/input';
import InputError from '@/components/user/atoms/input-error';
import { Label } from '@/components/user/atoms/label';
import NeutralBtn from '@/components/user/atoms/neutral-btn';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AuthLayout from '@/layouts/auth/auth-layout';
import { cn } from '@/lib/utils';
import z from 'zod';

const schema = z.object({
    email: z
        .email('Введите правильный email')
        .min(1, 'Введите email')
        .max(100, 'Email не должен превышать 100 символов'),
});

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, setError } = useForm<
        Required<{ email: string }>
    >({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const result = schema.safeParse(data);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const inertiaErrors: Record<keyof { email: string }, string> = {
                email: fieldErrors.email?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-white">
                    {status}
                </div>
            )}

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
                Введите адрес электронной почты, указанный при регистрации, и мы
                пришлем вам на него ссылку для восстановления пароля
            </p>

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="mx-auto grid w-full max-w-90 gap-3 px-2 sm:w-4/5 sm:max-w-full sm:gap-4 sm:px-0">
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
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className={cn(
                                'sm:text-base',
                                errors.email && 'text-red-600',
                            )}
                        />

                        <InputError message={errors.email} />
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
                        Отправить ссылку
                    </NeutralBtn>
                </form>

                <div className="space-x-1 text-center text-xs text-white/90 sm:text-sm">
                    <span>Вернуться на страницу</span>
                    <TextLink href={route('login')}>входа в аккаунт</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
