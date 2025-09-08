import { PaginationLink, PaginationMeta } from '@/lib/types/pagination';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type PaginationProps = {
    meta: Omit<PaginationMeta<unknown>, 'data'>;
    label?: string;
    className?: string;
    shouldScroll?: boolean;
    scrollElementId?: string;
};

export default function Pagination({
    meta,
    label,
    className,
    shouldScroll = true,
    scrollElementId,
}: PaginationProps) {
    const links = meta.links;

    const isFirstLink = (index: number) => index === 0;
    const isLastLink = (index: number) => index === links.length - 1;

    const renderLinkContent = (link: PaginationLink, index: number) => {
        if (isFirstLink(index)) {
            return (
                <ChevronLeftIcon className="size-10 text-white sm:size-6 2xl:size-10" />
            );
        }
        if (isLastLink(index)) {
            return (
                <ChevronRightIcon className="size-10 text-white sm:size-6 2xl:size-10" />
            );
        }
        return link.label;
    };

    const isNavigationButton = (index: number) =>
        isFirstLink(index) || isLastLink(index);

    return (
        <div
            className={cn(
                'flex items-center justify-between py-7 md:py-10 xl:py-14',
                className,
            )}
        >
            <div className="flex flex-1 justify-between sm:hidden">
                <PaginationBtn
                    key="prev-mobile-pagination-btn-0"
                    link={links[0]}
                    isNavigationButton={true}
                    shouldScroll={shouldScroll}
                    scrollElementId={scrollElementId}
                >
                    {renderLinkContent(links[0], 0)}
                </PaginationBtn>

                <PaginationBtn
                    key="next-mobile-pagination-btn"
                    link={links[links.length - 1]}
                    isNavigationButton={true}
                    shouldScroll={shouldScroll}
                    scrollElementId={scrollElementId}
                >
                    {renderLinkContent(
                        links[links.length - 1],
                        links.length - 1,
                    )}
                </PaginationBtn>
            </div>
            <div className="hidden flex-wrap sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div className="hidden">
                    <p className="text-sm 2xl:text-base">
                        Показаны {`${label ?? ''} `}с{' '}
                        <span className="font-medium">{meta.from}</span> по{' '}
                        <span className="font-medium">{meta.to}</span> из{' '}
                        <span className="font-medium">{meta.total}</span>
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate flex items-center justify-center gap-2 2xl:gap-3"
                    >
                        {links.map((link, index) => (
                            <PaginationBtn
                                key={index}
                                link={link}
                                isNavigationButton={isNavigationButton(index)}
                                shouldScroll={shouldScroll}
                                scrollElementId={scrollElementId}
                            >
                                {renderLinkContent(link, index)}
                            </PaginationBtn>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

type PaginationBtnProps = {
    link: PaginationLink;
    isNavigationButton: boolean;
    children: React.ReactNode;
    shouldScroll: boolean;
    scrollElementId?: string;
};

function PaginationBtn({
    link,
    isNavigationButton,
    children,
    shouldScroll,
    scrollElementId,
}: PaginationBtnProps) {
    const baseClasses = cn(
        'relative inline-flex size-8 items-center justify-center rounded-full font-medium ring-1 transition duration-200 ease-in ring-inset 2xl:size-12 2xl:text-2xl',
        {
            // Active state
            'bg-bright-salad text-white ring-transparent': link.active,
            // Inactive state
            'glow-shadow-inherit cursor-pointer ring-inherit ring-inset hover:scale-110':
                !link.active && link.url,
            // Navigation buttons (prev/next)
            'h-12 w-20 bg-bright-salad text-white ring-transparent sm:h-8 sm:w-12 2xl:h-12 2xl:w-20':
                isNavigationButton,
            // Disabled state
            'opacity-50': !link.url,
        },
    );

    // Disabled link
    if (!link.url) {
        return <span className={baseClasses}>{children}</span>;
    }

    // Active link with HTML content (for "..." etc.)
    const shouldUseDangerousHtml =
        !isNavigationButton &&
        typeof children === 'string' &&
        children.includes('&');

    return (
        <Link
            as="button"
            href={link.url}
            className={baseClasses}
            preserveState
            onSuccess={() => {
                if (!scrollElementId) return;
                const el = document.getElementById(scrollElementId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }}
            {...(shouldScroll === false ? { preserveScroll: true } : {})}
            {...(shouldUseDangerousHtml && {
                dangerouslySetInnerHTML: { __html: children as string },
            })}
        >
            {!shouldUseDangerousHtml && children}
        </Link>
    );
}
