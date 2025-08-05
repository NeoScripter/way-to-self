import PrimaryBtn from '@/components/user/atoms/primary-btn';
import formatCurrency from '@/lib/helpers/formatCurrency';
import { cn } from '@/lib/utils';
import { Tier } from '@/types/model';
import { Field, Input, Label } from '@headlessui/react';
import { router, usePage } from '@inertiajs/react';
import { ArrowRight, Check, Tag } from 'lucide-react';

function CheckoutItem({ name, price }: { name: string; price: number }) {
    return (
        <li className="flex items-center justify-between gap-2 sm:text-lg">
            <span className="leading-relaxed">{name}</span>
            <span
                className="tabular-nums"
                aria-label={`Цена: ${price}`}
            >
                {formatCurrency(price)}
            </span>
        </li>
    );
}

type Discount = {
    percents: number;
    amount: number;
};

type CheckoutDisplayProps = {
    className?: string;
    errorMessage?: string;
    onPaymentClick: () => void;
    isCart: boolean;
};

export default function CheckoutDisplay({
    isCart,
    onPaymentClick,
    className,
    errorMessage,
}: CheckoutDisplayProps) {
    const { tiers, added, total, discount} = usePage<{
        tiers: Tier[];
        added: number[];
        total: number;
        discount: Discount
    }>().props;

    const items = tiers.filter(tier => added.includes(tier.id));

    function handleEmptyCart() {
        router.visit(route('cart.tiers.empty'), {
            method: 'post',
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <section
            className={cn(
                'max-w-85 rounded-3xl border-2 border-white/20 bg-card-backdrop-gray/50 px-7 py-12 backdrop-blur-sm sm:w-full sm:max-w-182 sm:rounded-[3rem] sm:px-10',
                className,
            )}
            role="region"
            aria-labelledby="checkout-heading"
        >
            <h3
                id="checkout-heading"
                className="mb-6.5 text-xl font-bold sm:text-2xl"
            >
                Выбрано:
            </h3>
            <ul
                className="mb-5 space-y-3 sm:mb-7"
                role="list"
                aria-label="Выбранные товары"
            >
                {items.map((item) => (
                    <CheckoutItem
                        key={item.id}
                        price={item.price}
                        name={item.name}
                    />
                ))}
            </ul>

            <div className="border-b-2 border-main-page-bg pb-5 sm:pb-7">
                <div className="flex gap-3 sm:gap-5">
                    <Field className="relative w-full">
                        <Label className="sr-only">Промокод</Label>
                        <Input
                            className="peer ease h-full w-full rounded-full border-2 border-slate-200 bg-white py-2 pr-5 pl-11 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-gray-500 hover:border-light-swamp focus:border-light-swamp focus:shadow focus:outline-none sm:text-base"
                            placeholder="Промокод"
                        />
                        <Tag className="ease absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-500 transition duration-300 peer-focus:text-light-swamp" />
                    </Field>

                    <PrimaryBtn
                        className="flex size-11 shrink-0 items-center justify-center p-1 sm:w-auto sm:px-6"
                    >
                        <Check className="size-4/5 text-white sm:hidden" />
                        <span className="hidden sm:block">Применить</span>
                    </PrimaryBtn>
                </div>
                {errorMessage != null && (
                    <div
                        role="alert"
                        aria-live="polite"
                        className="mt-5 text-xl text-red-500 sm:text-2xl"
                    >
                        {errorMessage}
                    </div>
                )}
                {discount != null && (
                    <div
                        role="status"
                        aria-live="polite"
                        aria-label={`Применена скидка ${discount.percents} процентов на сумму ${discount.amount} рублей`}
                        className="mt-5 flex items-center justify-between gap-2 text-xl text-very-bright-salad sm:mt-7 sm:text-2xl"
                    >
                        <span>{`Скидка ${discount.percents}%`}</span>
                        <span>{formatCurrency(discount.amount)}</span>
                    </div>
                )}
            </div>

            <div
                className="mt-5 flex items-center justify-between gap-2 text-xl font-bold text-white sm:mt-7 sm:text-2xl"
                role="group"
                aria-label="Итоговая сумма заказа"
            >
                <span
                    className="tabular-nums"
                    aria-label={`Итого к оплате: ${total}`}
                >
                    Итого
                </span>
                <span>{formatCurrency(total)}</span>
            </div>

            <PrimaryBtn
                onClick={isCart ? onPaymentClick : handleEmptyCart}
                className="mt-10 w-full sm:text-lg"
            >
                {isCart ? (
                    <span>
                        Перейти к оплате
                        <ArrowRight className="ml-2 inline size-5 text-white sm:size-6" />
                    </span>
                ) : (
                    <span className="font-bold uppercase">Оплатить</span>
                )}
            </PrimaryBtn>
        </section>
    );
}
