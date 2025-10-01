import Exit from '@/assets/svgs/admin/admin-exit.svg';
import { adminMenu, AdminMenuList } from '@/lib/data/admin-menu-items';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import AdminNavLink from '../atoms/admin-nav-link';

type NavMenuProps = {
    className?: string;
    show: boolean;
};

export default function NavMenu({ className, show }: NavMenuProps) {

    return (
        <div
            className={cn(
                'fixed top-12.5 right-0 bottom-0 left-0 z-100 bg-black/30 transition-opacity duration-500 ease-in-out sm:top-22 md:top-25 xl:pointer-events-auto xl:static xl:block xl:h-auto xl:max-w-90 xl:flex-1 xl:bg-transparent xl:opacity-100',
                className,
                show ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню"
        >
            <div
                className={cn(
                    'ml-auto max-h-full max-w-86 overflow-y-auto rounded-b-md bg-white pt-11 pr-19 pb-16 pl-10 transition-transform duration-500 ease-in-out sm:rounded-b-3xl xl:ml-0 xl:overflow-y-visible xl:rounded-3xl',
                    show
                        ? 'translate-x-0'
                        : 'translate-x-full xl:translate-x-0',
                )}
            >
                <div className="mb-15.5 space-y-8 sm:mb-30">
                    {adminMenu.map((list) => (
                        <List
                            key={list.id}
                            list={list}
                        />
                    ))}
                </div>

                <Link
                    href={route('logout')}
                    onSuccess={() => router.flushAll()}
                    method="post"
                    as="button"
                    className="flex w-55 cursor-pointer items-center justify-between rounded-xl border border-pale-swamp px-5 py-2 text-pale-gray shadow-xs shadow-pale-swamp transition-shadow hover:shadow-md"
                >
                    Выйти
                    <img
                        src={Exit}
                        aria-hidden="true"
                        className="-mr-2 size-5 object-contain"
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
}

type ListProps = {
    list: AdminMenuList;
};

function List({ list }: ListProps) {
    const { auth } = usePage<{ auth: Auth }>().props;

    function includedIn(allowed: string[]) {
        for (const role of auth.roles) {
            if (allowed.includes(role)) {
                return true;
            }
        }

        return false;
    }

    return (
        <div>
            <h3 className="mb-4 w-55 px-5 font-medium text-black uppercase underline underline-offset-3">
                {list.title}
            </h3>
            <ul className="space-y-1">
                {list.items.map((item) =>
                    includedIn(item.allowed) ? (
                        <AdminNavLink
                            key={item.id}
                            item={item}
                        />
                    ) : null,
                )}
            </ul>
        </div>
    );
}
