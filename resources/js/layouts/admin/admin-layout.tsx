import Exit from '@/assets/svgs/admin/admin-exit.svg';
import AdminHeader from '@/components/admin/orgamisms/admin-header';
import FlashMessage from '@/components/user/atoms/flash-message';
import useToggle from '@/hooks/use-toggle';
import {
    adminMenu,
    AdminMenuItem,
    AdminMenuList,
} from '@/lib/data/admin-menu-items';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';

type AdminLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
};

export default function AdminLayout({
    children,
    layoutClass,
    pageClass,
}: AdminLayoutProps) {
    const { flash } = usePage<{ flash: { message: string | null } }>().props;
    const [showMenu, toggleMenu] = useToggle(false);

    return (
        <div className={cn('min-h-screen bg-light-bg', layoutClass)}>
            {flash.message && <FlashMessage message={flash.message} />}

            <AdminHeader
                show={showMenu}
                onClick={() => toggleMenu()}
            />

            <main className="relative px-3 pt-6 pb-3.5 sm:px-9.5 sm:pt-5 sm:pb-7.5 lg:pt-10 lg:pb-14.5 xl:flex xl:items-start xl:gap-6.5 2xl:gap-10 2xl:px-15">
                <NavMenu
                    className=""
                    show={showMenu}
                />
                <div className={cn('', pageClass)}>{children}</div>
            </main>
        </div>
    );
}

type NavMenuProps = {
    className?: string;
    show: boolean;
};

function NavMenu({ className, show }: NavMenuProps) {
    return (
        <div
            className={cn(
                'fixed top-14.5 right-0 left-0 z-10 max-h-9/10 overflow-y-auto bg-black/30 transition-transform duration-500 ease-in-out sm:top-24 md:top-27 xl:overflow-y-visible xl:bg-transparent xl:static xl:block xl:h-auto xl:max-w-90 xl:flex-1',
                className,
                show ? 'translate-x-0' : 'translate-x-full xl:translate-x-0',
            )}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню"
        >
            <div className="ml-auto max-w-86 rounded-b-md xl:rounded-3xl xl:ml-0 bg-white pt-11 pr-19 pb-16 pl-10 sm:rounded-b-3xl">
                <div className="mb-15.5 space-y-8 sm:mb-30">
                    {adminMenu.map((list) => (
                        <AdminList
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
                    className="flex cursor-pointer w-55 items-center hover:shadow-md transition-shadow justify-between rounded-xl border border-pale-swamp px-5 py-2 text-pale-gray shadow-xs shadow-pale-swamp"
                >
                    Выйти
                    <img
                        src={Exit}
                        aria-hidden="true"
                        className="size-5 object-contain -mr-2"
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
}

type AdminListProps = {
    list: AdminMenuList;
};

function AdminList({ list }: AdminListProps) {
    return (
        <div>
            <h3 className="mb-4 w-55 px-5 font-medium text-black uppercase underline underline-offset-3">
                {list.title}
            </h3>
            <ul className="space-y-1">
                {list.items.map((item) => (
                    <NavLink
                        key={item.id}
                        item={item}
                    />
                ))}
            </ul>
        </div>
    );
}

type NavLinkProps = {
    item: AdminMenuItem;
};

function NavLink({ item }: NavLinkProps) {
    const { url } = usePage();

    const isCurrent = false;
    // const isCurrent = route(item.route).endsWith(url);

    return (
        <li
            className={cn(
                'flex w-55 cursor-pointer list-none items-center gap-2 rounded-xl px-5 py-2 whitespace-nowrap text-dark-swamp transition-all duration-200 ease-in-out',
                isCurrent
                    ? 'bg-pale-swamp/20 shadow-sm ring-1 shadow-pale-swamp ring-pale-swamp'
                    : 'hover:shadow-sm hover:ring-1 hover:shadow-pale-swamp hover:ring-pale-swamp',
            )}
        >
            <Link
                href={route(item.route)}
                className="block size-4.5"
                as="button"
                aria-hidden="true"
            >
                <img
                    src={item.icon}
                    alt=""
                    className="size-full object-contain"
                />
            </Link>
            {item.title}
        </li>
    );
}
