import { cn } from "@/lib/utils";
import { Field, Input, Label } from "@headlessui/react";
import { ArrowRight, Check, Tag } from "lucide-react";
import PrimaryBtn from "@/components/user/atoms/primary-btn";

function CheckoutItem({ name, price }: {
    name: string;
    price: number;
}) {

    return (
        <li
            className="flex sm:text-lg items-center justify-between gap-2"
        >
            <span className="leading-relaxed">
                {name}
            </span>
            <span
                className="tabular-nums"
                aria-label={`Цена: ${price}`}
            >
                {`${price} P`}
            </span>
        </li>
    );
}


type Discount = {
    percents: number;
    amount: number;
}

const discount: Discount = {
    percents: 20,
    amount: 1794
};

const items = [
    { id: '1', name: 'Раздел душа', price: 2990 },
    { id: '2', name: 'Раздел душа', price: 2990 },
    { id: '3', name: 'Раздел душа', price: 2990 }
];


type CheckoutDisplayProps = {
    className?: string;
    errorMessage?: string
    onPaymentClick: () => void;
}

export default function CheckoutDisplay({ onPaymentClick, className, errorMessage}: CheckoutDisplayProps) {
    const price = 11212;

    return (
        <section
            className={cn("rounded-3xl sm:rounded-[3rem] py-12 px-7 sm:px-10 border-2 border-white/20 max-w-85 sm:max-w-182 sm:w-full backdrop-blur-sm bg-card-backdrop-gray/50", className)}
            role="region"
            aria-labelledby="checkout-heading"
        >
            <h3
                id="checkout-heading"
                className="font-bold text-xl sm:text-2xl mb-6.5"
            >
                Выбрано:
            </h3>
            <ul
                className="space-y-3 mb-5 sm:mb-7"
                role="list"
                aria-label="Выбранные товары"
            >
                {items.map(item => (
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
                            className="w-full peer bg-white placeholder:text-gray-500 text-slate-700 text-sm sm:text-base border-2 border-slate-200 rounded-full h-full pr-5 pl-11 py-2 transition duration-300 ease focus:outline-none focus:border-light-swamp hover:border-light-swamp shadow-sm focus:shadow" placeholder="Промокод"
                        />
                        <Tag className="size-5 absolute top-1/2 -translate-y-1/2 left-4 transition duration-300 ease text-slate-500 peer-focus:text-light-swamp" />
                    </Field>

                    <PrimaryBtn
                        className="size-11 sm:w-auto flex p-1 sm:px-6 shrink-0 items-center justify-center"
                    >
                        <Check className="size-4/5 text-white sm:hidden" />
                        <span className="hidden sm:block">Применить</span>
                    </PrimaryBtn>
                </div>
                {errorMessage != null &&
                    <div
                        role="alert"
                        aria-live="polite"
                        className="mt-5 text-red-500 text-xl sm:text-2xl"
                    >
                        {errorMessage}
                    </div>}
                {discount != null &&
                    <div
                        role="status"
                        aria-live="polite"
                        aria-label={`Применена скидка ${discount.percents} процентов на сумму ${discount.amount} рублей`}
                        className="flex mt-5 sm:mt-7 text-xl sm:text-2xl text-very-bright-salad items-center gap-2 justify-between"
                    >
                        <span>{`Скидка ${discount.percents}%`}</span>
                        <span>{`-${discount.amount} Р`}</span>
                    </div>
                }
            </div>

            <div
                className="flex mt-5 text-xl sm:text-2xl sm:mt-7 text-white font-bold items-center gap-2 justify-between"
                role="group"
                aria-label="Итоговая сумма заказа"
            >
                <span
                    className="tabular-nums"
                    aria-label={`Итого к оплате: ${price}`}
                >
                    Итого
                </span>
                <span>{`${price} Р`}</span>
            </div>

            <PrimaryBtn
                onClick={onPaymentClick}
                className="w-full mt-10 sm:text-lg"
            >
                Перейти к оплате
                <ArrowRight className="inline size-5 sm:size-6 ml-2 text-white" />
            </PrimaryBtn>


        </section>
    )
}
