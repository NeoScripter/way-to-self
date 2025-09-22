import { AdminMenuItem } from '@/lib/data/admin-menu-items';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';

type AdminNavLinkProps = {
    item: AdminMenuItem;
};

export default function AdminNavLink({ item }: AdminNavLinkProps) {
    const { url } = usePage();

    const isCurrent = false;
    // const isCurrent = route(item.route).includes(url);

    return (
        <li
            className={cn(
                'flex relative list-none items-center gap-2 rounded-xl px-5 py-2 whitespace-nowrap text-dark-swamp transition-all duration-200 ease-in-out select-none',
                isCurrent
                    ? 'bg-pale-swamp/20 shadow-sm ring-1 shadow-pale-swamp ring-pale-swamp'
                    : 'hover:shadow-sm hover:ring-1 hover:shadow-pale-swamp hover:ring-pale-swamp',
            )}
        >
            <Link
                href={route(item.route)}
                as="button"
                className="absolute cursor-pointer inset-0"
            >
            </Link>
            <img
                src={item.icon}
                alt=""
                className="size-4.5 object-contain"
            />
            {item.title}
        </li>
    );
}
