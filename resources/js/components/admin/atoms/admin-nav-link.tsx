import { AdminMenuItem } from '@/lib/data/admin-menu-items';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';

type AdminNavLinkProps = {
    item: AdminMenuItem;
};

export default function AdminNavLink({ item }: AdminNavLinkProps) {
    let { url } = usePage();

    url = url.includes('?') ? url.split('?')[0] : url;
    const parsed = route(item.route).split('/').slice(3, 5).join('/');

    const isCurrent = url.includes(parsed);

    return (
        <li
            className={cn(
                'relative flex cursor-pointer list-none items-center gap-2 rounded-xl px-5 py-2 whitespace-nowrap text-dark-swamp transition-all duration-200 ease-in-out select-none',
                isCurrent
                    ? 'bg-pale-swamp/20 shadow-sm ring-1 shadow-pale-swamp ring-pale-swamp'
                    : 'hover:shadow-sm hover:ring-1 hover:shadow-pale-swamp hover:ring-pale-swamp',
            )}
        >
            <Link
                href={route(item.route)}
                prefetch
                as="button"
                className="absolute inset-0 cursor-pointer"
            ></Link>
            <img
                src={item.icon}
                alt=""
                className="size-4.5 object-contain"
            />
            {item.title}
        </li>
    );
}
