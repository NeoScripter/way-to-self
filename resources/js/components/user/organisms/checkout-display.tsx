import PrimaryBtn from '@/components/user/atoms/primary-btn';
import formatCurrency from '@/lib/helpers/formatCurrency';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { Tier } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import DiscountField from '../molecules/discount-field';

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

type CheckoutDisplayProps = {
    className?: string;
    onPaymentClick: () => void;
    isCart: boolean;
};

export default function CheckoutDisplay({
    isCart,
    onPaymentClick,
    className,
}: CheckoutDisplayProps) {
    const { tiers, added, total, auth } = usePage<{
        tiers: Tier[];
        added: number[];
        total: number;
        auth: Auth;
    }>().props;

    const isLoggedIn = auth.user != null;
    const items = tiers.filter((tier) => added.includes(tier.id));

    function handlePurchase() {
        if (!isLoggedIn) return;

        router.visit(route('payment.process'));
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

            <DiscountField className="pb-5 sm:pb-7" />

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

            {isCart ? (
                <PrimaryBtn
                    onClick={onPaymentClick}
                    className="mt-10 w-full sm:text-lg"
                    type="button"
                    key="cart-button"
                >
                    <span>
                        Перейти к оплате
                        <ArrowRight className="ml-2 inline size-5 text-white sm:size-6" />
                    </span>
                </PrimaryBtn>
            ) : (
                <PrimaryBtn
                    onClick={handlePurchase}
                    className="mt-10 w-full sm:text-lg"
                    form="purchase-form"
                    type="submit"
                    key="payment-button"
                >
                    <span className="font-bold uppercase">Оплатить</span>
                </PrimaryBtn>
            )}
        </section>
    );
}
