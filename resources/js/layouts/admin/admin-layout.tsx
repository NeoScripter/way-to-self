import AdminHeader from '@/components/admin/orgamisms/admin-header';
import FlashMessage from '@/components/user/atoms/flash-message';
import useToggle from '@/hooks/use-toggle';
import { AdminMenuItem, AdminMenuList } from '@/lib/data/admin-menu-items';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

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

            <AdminHeader />

            <main className="relative px-3 pt-6 pb-3.5 sm:px-9.5 sm:pt-5 sm:pb-7.5 lg:pt-7 lg:pb-14.5 xl:flex xl:items-start xl:gap-6.5 2xl:gap-10 2xl:px-33">
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
                'fixed top-0 right-0 left-0 z-10 h-200 max-h-screen overflow-y-auto bg-black/30 transition-transform duration-500 ease-in-out md:h-auto md:flex-1 md:overflow-y-visible xl:static xl:block xl:max-w-90',
                className,
                show ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
            )}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню"
        >
            <div className="rounded-b-3xl bg-white"></div>
        </div>
    );
}

type AdminListProps = {
    list: AdminMenuList;
};

function AdminList({ list }: AdminListProps) {
    return (
        <div>
            <h3 className="text-black uppercase underline underline-offset-2">
                {list.title}
            </h3>
            <ul className="space-y-2">
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
    return (
        <li className="list-none whitespace-nowrap transition-colors duration-200 ease-in hover:text-very-bright-salad">
            {item.title}
        </li>
    );
}
