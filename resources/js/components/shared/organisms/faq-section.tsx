import SpanHighlight from '@/components/user/atoms/span-highlight';
import useToggle from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/model';
import { usePage } from '@inertiajs/react';

type FAQSectionProps = {
    short?: boolean;
};

export default function FAQSection({ short = false }: FAQSectionProps) {
    const { faqs } = usePage<{ faqs: FaqItem[] }>().props;

    if (faqs.length === 0) return null;

    return (
        <>
            <h3 className="relative z-11 mb-11 flex flex-wrap items-center justify-center sm:mb-16 xl:mb-20">
                <SpanHighlight
                    text="Ответы"
                    className="mt-[0.1em] bg-very-bright-salad text-[4rem] text-black sm:text-[8rem]"
                />
                <SpanHighlight
                    text="на популярные"
                    className="mt-[0.1em] bg-very-bright-salad text-[4rem] text-black sm:text-[8rem]"
                />
                <SpanHighlight
                    text="вопросы"
                    className="mt-[0.1em] bg-very-bright-salad text-[4rem] text-black sm:text-[8rem]"
                />
                {!short && <SpanHighlight
                    text="о портале"
                    className="mt-[0.1em] bg-very-bright-salad text-[4rem] text-black sm:text-[8rem]"
                />}
            </h3>

            <span
                className="sr-only"
                id="faq-section-title"
            >
                Ответы на популярные вопросы о портале
            </span>

            <ul className="relative z-11 mb-11 space-y-4 sm:mb-16 sm:space-y-6 lg:space-y-8 xl:mb-20 2xl:space-y-10">
                {faqs.map((faq) => (
                    <AccordionItem
                        key={faq.id}
                        id={faq.id}
                        title={faq.title}
                        description={faq.html}
                    />
                ))}
            </ul>
        </>
    );
}

type AccordionItemProps = {
    id: number;
    title: string;
    description: string;
};

function AccordionItem({ id, title, description }: AccordionItemProps) {
    const [show, toggleShow] = useToggle(false);

    return (
        <li>
            <button
                onClick={() => toggleShow()}
                className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-2 text-left"
                aria-expanded={show}
                aria-controls={`accordion-content-${id}`}
                id={`accordion-button-${id}`}
                type="button"
            >
                <span className="block flex-1 font-bold text-black sm:text-xl lg:text-2xl">
                    {title}
                </span>
                <div
                    className={cn(
                        'flex size-9 items-center justify-center rounded-full text-white transition-colors duration-500 ease-in-out sm:size-13',
                        show ? 'bg-very-bright-salad' : 'bg-bright-salad',
                    )}
                >
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
                                'origin-center transition-transform duration-500 ease-in-out',
                                show ? 'rotate-0' : 'rotate-180',
                            )}
                        />
                        <path
                            d="M12 5v14"
                            className={cn(
                                'origin-center transition-transform duration-500 ease-in-out',
                                show ? 'rotate-90' : 'rotate-0',
                            )}
                        />
                    </svg>
                </div>
            </button>
            <div
                className={cn(
                    'max-w-9/10 overflow-hidden transition-[max-height] duration-500 ease-in-out',
                    show ? 'max-h-100' : 'max-h-0',
                )}
                id={`accordion-content-${id}`}
                role="region"
                aria-labelledby={`accordion-button-${id}`}
                aria-hidden={!show}
            >
                <span
                    dangerouslySetInnerHTML={{ __html: description }}
                    className="sm:prose-md my-3 prose prose-sm block max-w-full text-black lg:prose-lg lg:mt-5 2xl:prose-xl"
                ></span>
            </div>
        </li>
    );
}
