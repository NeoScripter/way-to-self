import useToggle from "@/hooks/use-toggle";
import SpanHighlight from "../../atoms/span-highlight";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import type { FaqItem } from "@/types/model";

export default function FAQSection() {
    const { faqs } = usePage<{ faqs: FaqItem[] }>().props;

    if (faqs.length === 0) return null;

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
                    <AccordionItem key={faq.id} id={faq.id} title={faq.title} description={faq.html} />
                ))}
            </ul>

        </>
    );
}

type AccordionItemProps = {
    id: number;
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
                <span dangerouslySetInnerHTML={{ __html: description }} className="my-3 prose prose-sm max-w-full text-black block sm:prose-md lg:prose-lg lg:mt-5 2xl:prose-xl">
                </span>
            </div>
        </li>
    )
}
