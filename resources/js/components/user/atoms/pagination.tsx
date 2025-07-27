import { PaginationMeta } from "@/lib/types/pagination";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

type PaginationProps = {
    meta: Omit<PaginationMeta<unknown>, 'data'>;
}

export default function Pagination({ meta }: PaginationProps) {
    const links = meta.links;

    const firstLink = links.length > 0 ? links[0]?.url : null;
    const lastLink = links.length > 0 ? links[links.length - 1]?.url : null;

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {firstLink && <Link
                    href={firstLink}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </Link>}
                {lastLink && <Link
                    href={lastLink}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </Link>}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
                        <span className="font-medium">{meta.total}</span> results
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                        {links.map(link => (
                            link.url && <Link
                                href={link.url}
                                className={cn("relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0", link.active ? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0")}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            >
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
