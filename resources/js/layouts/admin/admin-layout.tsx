import AdminNavMenu from '@/components/admin/molecules/admin-nav-menu';
import AdminHeader from '@/components/admin/orgamisms/admin-header';
import FlashMessage from '@/components/user/atoms/flash-message';
import useToggle from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { v4 as v4uuid } from 'uuid';

type BarMenuItem = {
    id: string;
    route: string;
    title: string;
};

const barMenuItems: BarMenuItem[] = [
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Рецепты',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Душа',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Упражнения',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Рецепты',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Душа',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Упражнения',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Рецепты',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Душа',
    },
    {
        id: v4uuid(),
        route: 'admin.dashboard',
        title: 'Упражнения',
    },
];

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
                <AdminNavMenu show={showMenu} />
                <div className="w-full">
                    <nav>
                        <ul className="grid-auto gap-x-0.5 [--min:90px] sm:[--min:120px] lg:[--min:140px]">
                            {barMenuItems.map((item) => (
                                <TopBarLink
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </ul>
                    </nav>

                    <div
                        className={cn(
                            'rounded-b-3xl bg-white px-7 pt-8.5 pb-10 sm:px-12 sm:pt-11 sm:pb-16 xl:px-15 xl:pb-17',
                            pageClass,
                        )}
                    >
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

type TopBarLinkProps = {
    item: BarMenuItem;
};

function TopBarLink({ item }: TopBarLinkProps) {
    return (
        <li>
            <Link
                href={route(item.route)}
                className="flex cursor-pointer -mt-2 admin-link-shadow items-center rounded-t-[2.25rem] justify-center bg-pale-olive px-4 py-2 lg:py-3 text-xs text-white sm:text-sm lg:text-base"
            >
                {item.title}
            </Link>
        </li>
    );
}
