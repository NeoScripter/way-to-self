import PrimaryBtn from '@/components/user/atoms/primary-btn';
import formatCurrency from '@/lib/helpers/formatCurrency';
import { cn } from '@/lib/utils';
import { Field, Input, Label } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { Check, Tag } from 'lucide-react';
import InputError from '../atoms/input-error';

type DiscountFieldProps = {
    className?: string;
};

type Discount = {
    percent: number;
    amount: number;
};

export default function DiscountField({ className }: DiscountFieldProps) {
    const { discount, total } = usePage<{
        discount: Discount | undefined;
        total: number;
    }>().props;

    const { data, clearErrors, setData, reset, post, setError, errors } = useForm({
        code: '',
    });

    function handleSubmit() {
        if (data.code === '') {
            setError('code', 'Введите промокод');
            return;
        }
        post(route('cart.tiers.store'), {
            preserveScroll: true,
            preserveState: true,
        });
        reset();
        setTimeout(() => clearErrors(), 1000 * 5);
    }

    return (
        <div className={cn('border-b-2 border-main-page-bg', className)}>
            <div className="flex gap-3 sm:gap-5">
                <Field className="relative w-full">
                    <Label className="sr-only">Промокод</Label>
                    <Input
                        className="peer ease h-full w-full rounded-full border-2 border-slate-200 bg-white py-2 pr-5 pl-11 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-gray-500 hover:border-light-swamp focus:border-light-swamp focus:shadow focus:outline-none sm:text-base"
                        placeholder="Промокод"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                    />
                    <Tag className="ease absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-500 transition duration-300 peer-focus:text-light-swamp" />
                </Field>

                <PrimaryBtn
                    type="button"
                    onClick={handleSubmit}
                    className="flex size-11 shrink-0 items-center justify-center p-1 sm:w-auto sm:px-6"
                >
                    <Check className="size-4/5 text-white sm:hidden" />
                    <span className="hidden sm:block">Применить</span>
                </PrimaryBtn>
            </div>

            {errors.code != null && (
                <InputError
                    className="mt-8"
                    message={errors.code}
                />
            )}

            {discount && total > 0 && (
                <div
                    role="status"
                    aria-live="polite"
                    aria-label={`Применена скидка ${discount.percent} на сумму ${discount.amount} рублей`}
                    className="mt-5 flex items-center justify-between gap-2 text-xl text-very-bright-salad sm:mt-7 sm:text-2xl"
                >
                    <span>{`Скидка ${discount.percent}`}</span>
                    <span>{`-${formatCurrency(discount.amount)}`}</span>
                </div>
            )}
        </div>
    );
}
