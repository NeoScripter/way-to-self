import useToggle from "@/hooks/use-toggle";
import SpanHighlight from "../../atoms/span-highlight";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

export default function FAQSection() {
    return (
        <>
            <h3 className="flex flex-wrap items-center justify-center mb-11 sm:mb-16 xl:mb-20">
                <SpanHighlight
                    text='Ответы'
                    className="text-black bg-very-bright-salad text-[4rem] sm:text-[8rem] mt-[0.1em]"
                />
                <SpanHighlight
                    text='на популярные'
                    className="text-black bg-very-bright-salad text-[4rem] sm:text-[8rem] mt-[0.1em]"
                />
                <SpanHighlight
                    text='вопросы'
                    className="text-black bg-very-bright-salad text-[4rem] sm:text-[8rem] mt-[0.1em]"
                />
                <SpanHighlight
                    text='о портале'
                    className="text-black bg-very-bright-salad text-[4rem] sm:text-[8rem] mt-[0.1em]"
                />
            </h3>

            <ul className="mb-11 space-y-4 sm:mb-16 sm:space-y-6 lg:space-y-8 xl:mb-20 2xl:space-y-10">
                {faqs.map(faq => (
                    <AccordionItem key={faq.id} id={faq.id} title={faq.title} description={faq.description} />
                ))}
            </ul>

        </>
    );
}

type AccordionItemProps = {
    id: string;
    title: string;
    description: string;
}

function AccordionItem({ id, title, description }: AccordionItemProps) {
    const [show, toggleShow] = useToggle(false);

    return (
        <li>
            <button
                onClick={() => toggleShow()}
                className="flex items-center min-h-12 justify-between w-full text-left gap-2 cursor-pointer"
                aria-expanded={show}
                aria-controls={`accordion-content-${id}`}
                id={`accordion-button-${id}`}
                type="button"
            >
                <span className="font-bold block flex-1 text-black sm:text-xl lg:text-2xl">
                    {title}
                </span>
                <div className={cn(
                    "rounded-full flex items-center size-9 text-white justify-center transition-colors duration-500 ease-in-out sm:size-13",
                    show ? "bg-very-bright-salad" : "bg-bright-salad"
                )}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-plus-icon lucide-plus size-3/5"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path
                            d="M5 12h14"
                            className={cn(
                                "transition-transform duration-500 ease-in-out origin-center",
                                show ? "rotate-0" : "rotate-180"
                            )}
                        />
                        <path
                            d="M12 5v14"
                            className={cn(
                                "transition-transform duration-500 ease-in-out origin-center",
                                show ? "rotate-90" : "rotate-0"
                            )}
                        />
                    </svg>
                </div>
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-[max-height] duration-500 ease-in-out max-w-9/10",
                    show ? "max-h-100" : "max-h-0"
                )}
                id={`accordion-content-${id}`}
                role="region"
                aria-labelledby={`accordion-button-${id}`}
                aria-hidden={!show}
            >
                <span className="my-3 block text-sm sm:text-base lg:text-lg lg:mt-5 2xl:text-xl">
                    {description}
                </span>
            </div>
        </li>
    )
}

type FAQItem = {
    id: string;
    title: string;
    description: string;
}

const faqs: FAQItem[] = [
    {
        id: uuidv4(),
        title: "С чего начать переход к здоровому образу жизни?",
        description: "Начните с малого: включите ежедневные прогулки, пейте больше воды и постепенно уменьшайте количество обработанных продуктов в рационе. Не стремитесь к резким переменам — устойчивые привычки формируются постепенно.",
    },
    {
        id: uuidv4(),
        title: "Какой режим сна считается здоровым?",
        description: "Здоровый сон — это 7–9 часов в сутки для взрослого человека. Ложитесь и просыпайтесь в одно и то же время, даже в выходные. Избегайте экранов и кофеина за 1–2 часа до сна.",
    },
    {
        id: uuidv4(),
        title: "Нужно ли полностью отказываться от сладкого?",
        description: "Нет, полный отказ не обязателен. Главное — умеренность. Вы можете изредка позволять себе десерты, особенно если основа вашего рациона — полезные продукты: овощи, фрукты, цельнозерновые и белок.",
    },
    {
        id: uuidv4(),
        title: "Сколько нужно заниматься спортом в неделю?",
        description: "Всемирная организация здравоохранения рекомендует минимум 150 минут умеренной физической активности в неделю — это 30 минут 5 раз в неделю. Подойдут прогулки, плавание, йога, езда на велосипеде и т. д.",
    },
    {
        id: uuidv4(),
        title: "Как сохранять мотивацию на пути к здоровому образу жизни?",
        description: "Ставьте реалистичные цели, отслеживайте прогресс, окружите себя поддерживающей средой. Помните: это не временная диета, а стиль жизни. Награждайте себя за успехи и не корите за временные откаты.",
    },
];

