import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRightIcon } from 'lucide-react';

type BreadcrumbsProps = {
    className?: string;
    itemName?: string;
    labels: string[];
    highlightClass?: string;
};

export default function Breadcrumbs({
    labels,
    itemName,
    className,
    highlightClass
}: BreadcrumbsProps) {
    const { url } = usePage();
    let path = url;

    const allLabels = [...labels, ...(itemName ? [itemName] : [])];

    const items = allLabels.map((label, index) => {
        const pathSegments = path.split('/');
        const segmentsToKeep =
            pathSegments.length - (allLabels.length - 1 - index);

        return {
            label,
            href: pathSegments.slice(0, segmentsToKeep).join('/') || '/',
        };
    });

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn('mx-auto w-fit', className)}
        >
            <ol className="flex items-center text-text-black gap-2 text-xs sm:text-sm md:text-lg lg:text-xl">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li
                            key={i}
                            className={cn(
                                'flex items-center gap-2',
                                item.href === url && (highlightClass || 'text-bright-salad'),
                            )}
                        >
                            {isLast ? (
                                <span
                                    aria-current="page"
                                    className="font-medium"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    as="button"
                                    href={item.href}
                                    prefetch
                                    className="cursor-pointer hover:underline"
                                >
                                    {item.label}
                                </Link>
                            )}
                            {!isLast && (
                                <span aria-hidden="true">
                                    <ChevronRightIcon className="w-4 md:w-5" />
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
