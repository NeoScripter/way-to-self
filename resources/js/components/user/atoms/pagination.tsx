import { PaginationLink, PaginationMeta } from "@/lib/types/pagination";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

type PaginationProps = {
    meta: Omit<PaginationMeta<unknown>, 'data'>;
    label?: string;
    className?: string;
}

export default function Pagination({ meta, label, className }: PaginationProps) {
    const links = meta.links;

    const isFirstLink = (index: number) => index === 0;
    const isLastLink = (index: number) => index === links.length - 1;

    const renderLinkContent = (link: PaginationLink, index: number) => {
        if (isFirstLink(index)) {
            return <ChevronLeftIcon className="text-white size-10 sm:size-6 2xl:size-10" />;
        }
        if (isLastLink(index)) {
            return <ChevronRightIcon className="text-white size-10 sm:size-6 2xl:size-10" />;
        }
        return link.label;
    };

    const isNavigationButton = (index: number) =>
        isFirstLink(index) || isLastLink(index);

    return (
        <div className={cn("flex items-center justify-between py-7 md:py-10 xl:py-14", className)}>
            <div className="flex flex-1 justify-between sm:hidden">
                <PaginationBtn
                    key="prev-mobile-pagination-btn"
                    link={links[0]}
                    isNavigationButton={true}
                >
                    {renderLinkContent(links[0], 0)}
                </PaginationBtn>

                <PaginationBtn
                    key="prev-mobile-pagination-btn"
                    link={links[links.length - 1]}
                    isNavigationButton={true}
                >
                    {renderLinkContent(links[links.length - 1], links.length - 1)}
                </PaginationBtn>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center lg:justify-between flex-wrap">
                <div className="hidden lg:block">
                    <p className="text-sm text-dark-green 2xl:text-base">
                        Показаны {`${label ?? ""} `}с <span className="font-medium">{meta.from}</span> по <span className="font-medium">{meta.to}</span> из{' '}
                        <span className="font-medium">{meta.total}</span>
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate flex gap-2 justify-center items-center 2xl:gap-3">
                        {links.map((link, index) => (
                            <PaginationBtn
                                key={index}
                                link={link}
                                isNavigationButton={isNavigationButton(index)}
                            >
                                {renderLinkContent(link, index)}
                            </PaginationBtn>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

type PaginationBtnProps = {
    link: PaginationLink;
    isNavigationButton: boolean;
    children: React.ReactNode;
};

function PaginationBtn({ link, isNavigationButton, children }: PaginationBtnProps) {
    const baseClasses = cn(
        "relative inline-flex justify-center items-center font-medium rounded-full size-8 2xl:size-12 2xl:text-2xl ring-1 ring-inset transition duration-200 ease-in",
        {
            // Active state
            "text-white bg-bright-salad ring-transparent": link.active,
            // Inactive state
            "text-dark-green cursor-pointer ring-dark-swamp ring-inset hover:scale-110 glow-shadow-green": !link.active && link.url,
            // Navigation buttons (prev/next)
            "w-20 h-12 sm:w-12 sm:h-8 2xl:h-12 2xl:w-20 text-white bg-bright-salad ring-transparent": isNavigationButton,
            // Disabled state
            "opacity-50": !link.url,
        }
    );

    // Disabled link
    if (!link.url) {
        return <span className={baseClasses}>{children}</span>;
    }

    // Active link with HTML content (for "..." etc.)
    const shouldUseDangerousHtml = !isNavigationButton && typeof children === 'string' && children.includes('&');

    return (
        <Link as="button"
            href={link.url}
            className={baseClasses}
            {...(shouldUseDangerousHtml && {
                dangerouslySetInnerHTML: { __html: children as string }
            })}
        >
            {!shouldUseDangerousHtml && children}
        </Link>
    );
}
