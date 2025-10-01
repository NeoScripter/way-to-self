import NavMenu from '@/components/admin/molecules/nav-menu';
import AdminHeader from '@/components/admin/orgamisms/admin-header';
import FlashMessage from '@/components/user/atoms/flash-message';
import useToggle from '@/hooks/use-toggle';
import { BarMenuItem } from '@/lib/data/admin-top-bar-items';
import markLastRow from '@/lib/helpers/markLastRow';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

type AdminLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
    topMenuItems?: BarMenuItem[];
};

export default function AdminLayout({
    children,
    layoutClass,
    pageClass,
    topMenuItems,
}: AdminLayoutProps) {
    const { flash } = usePage<{ flash: { message: string | null } }>().props;
    const [showMenu, toggleMenu] = useToggle(false);

    const ulRef = useRef<HTMLUListElement>(null);
    const hasMenu = topMenuItems && topMenuItems.length > 0;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.id === 'mobile-navigation') {
            toggleMenu(false);
        }
    };

    useEffect(() => {
        if (ulRef.current) {
            markLastRow(ulRef.current);
        }

        const handleResize = () => {
            if (ulRef.current) markLastRow(ulRef.current);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div onClick={handleClick}   className={cn('min-h-screen bg-light-bg', layoutClass)}>
            {flash.message && <FlashMessage message={flash.message} />}

            <AdminHeader
                show={showMenu}
                onClick={() => toggleMenu()}
            />

            <main className="relative px-3 pt-6 pb-3.5 sm:px-9.5 sm:pt-5 sm:pb-7.5 lg:pt-10 lg:pb-14.5 xl:flex xl:items-start xl:gap-6.5 2xl:gap-10 2xl:px-15">
                <NavMenu show={showMenu} />

                <div className="w-full xl:max-w-7/10 2xl:max-w-full">
                    {hasMenu && (
                        <nav>
                            <ul
                                ref={ulRef}
                                className="grid-auto admin-navbar gap-x-0.5 [--min:100px] sm:[--min:120px] lg:[--min:140px]"
                            >
                                {topMenuItems.map((item) => (
                                    <TopBarLink
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                            </ul>
                        </nav>
                    )}

                    <div
                        className={cn(
                            'rounded-b-3xl bg-white px-7 pt-8.5 pb-10 sm:px-12 sm:pt-11 sm:pb-16 xl:px-15 xl:pb-17',
                            pageClass,
                            !hasMenu && 'rounded-t-3xl',
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
    const { url } = usePage();

    const isCurrent = route(item.route).includes(
        url.includes('?') ? url.split('?')[0] : url,
    );

    return (
        <li>
            <Link
                href={route(item.route)}
                className={cn(
                    'flex cursor-pointer items-center justify-center rounded-t-[2.25rem] bg-pale-olive px-4 py-2 text-xs text-white sm:text-sm lg:py-3 lg:text-base',
                    isCurrent
                        ? 'bg-bright-salad'
                        : 'transition-colors duration-200 ease-in-out hover:bg-light-swamp',
                )}
            >
                {item.title}
            </Link>
        </li>
    );
}
