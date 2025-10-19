import { cn } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import z from 'zod';
import CheckboxInput from '../atoms/checkbox-input';
import InputField from '../atoms/input-field';

type TierSignUpProps = {
    className?: string;
    isCart: boolean;
};

type RegisterForm = {
    name: string;
    surname: string;
    email: string;
    telegram: string;
    agreedData: boolean;
    agreedPolicy: boolean;
};

const schema = z.object({
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
        .min(1, 'Введите email')
        .email('Введите правильный email')
        .max(100, 'Email не должен превышать 100 символов'),
    telegram: z
        .string()
        .min(1, 'Введите ник в телеграм')
        .max(100, 'Ник не должен превышать 100 символов'),
    agreedData: z.boolean().refine((val) => val === true, {
        message: 'Необходимо согласие на обработку данных',
    }),
    agreedPolicy: z.boolean().refine((val) => val === true, {
        message: 'Необходимо принять политику конфиденциальности',
    }),
});

export default function TierSignUp({ className, isCart }: TierSignUpProps) {
    const { data, setError, setData, post, processing, errors, reset } =
        useForm<Required<RegisterForm>>({
            name: '',
            surname: '',
            email: '',
            telegram: '',
            agreedData: false,
            agreedPolicy: false,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isCart) return;

        const result = schema.safeParse(data);
        console.log(result);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            console.log(fieldErrors);

            const inertiaErrors: Record<keyof RegisterForm, string> = {
                email: fieldErrors.email?.[0] ?? '',
                name: fieldErrors.name?.[0] ?? '',
                surname: fieldErrors.surname?.[0] ?? '',
                telegram: fieldErrors.telegram?.[0] ?? '',
                agreedData: fieldErrors.agreedData?.[0] ?? '',
                agreedPolicy: fieldErrors.agreedPolicy?.[0] ?? '',
            };

            setError(inertiaErrors);
            return;
        }

        post(route('register'));
    };
    return (
        <form
            id="purchase-form"
            onSubmit={submit}
            className={cn(
                'max-w-85 rounded-3xl border-2 border-white/20 bg-card-backdrop-gray/50 px-7 py-12 backdrop-blur-sm sm:w-full sm:max-w-182 sm:rounded-[3rem] sm:px-10 xl:max-w-210',
                className,
            )}
        >
            <h2 className="mb-6 font-heading text-2xl font-medium sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl">
                Данные для создания личного кабинета
            </h2>

            <div className="space-y-5 md:space-y-6">
                <InputField
                    id="name"
                    label="Ваше имя"
                    disabled={processing}
                    value={data.name}
                    placeholder="Ваше имя*"
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />
                <InputField
                    id="surname"
                    label="Ваша фамилия"
                    disabled={processing}
                    value={data.surname}
                    placeholder="Ваша фамилия*"
                    onChange={(e) => setData('surname', e.target.value)}
                    error={errors.surname}
                />

                <InputField
                    id="email"
                    label="Ваш Email"
                    value={data.email}
                    placeholder="Ваш Email*"
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />

                <InputField
                    id="telegram"
                    label="Ваш ник в телеграм"
                    value={data.telegram}
                    placeholder="Ваш ник в телеграм*"
                    onChange={(e) => setData('telegram', e.target.value)}
                    error={errors.telegram}
                />
            </div>

            <div className="mt-6 space-y-2 px-2 text-sm sm:mt-8 md:mt-10 md:space-y-4 md:px-4 md:text-base">
                <CheckboxInput
                    checked={data.agreedData}
                    onChange={(checked) => setData('agreedData', checked)}
                    checkboxClassName="size-7"
                    error={errors.agreedData}
                >
                    Даю согласие на
                    <InfoLink
                        label="обработку персональных данных"
                        routeName={route('legal.offer')}
                    />
                </CheckboxInput>
                <CheckboxInput
                    checked={data.agreedPolicy}
                    onChange={(checked) => setData('agreedPolicy', checked)}
                    checkboxClassName="size-7"
                    error={errors.agreedPolicy}
                >
                    Принимаю
                    <InfoLink
                        label="политику конфиденциальности"
                        routeName={route('legal.policy')}
                    />
                    и
                    <InfoLink
                        label="согласие на обработку персональных данных"
                        routeName={route('legal.consent')}
                    />
                </CheckboxInput>{' '}
            </div>
        </form>
    );
}

const InfoLink: React.FC<{ routeName: string; label: string }> = ({
    label,
    routeName,
}) => {
    return (
        <Link
            prefetch
            href={routeName}
            className="ease underline underline-offset-3 transition-colors duration-200 hover:text-dark-swamp"
        >
            {label}
        </Link>
    );
};
