import { adminMenu, AdminMenuList } from "@/lib/data/admin-menu-items";
import Exit from '@/assets/svgs/admin/admin-exit.svg';
import { cn } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import AdminNavLink from "../atoms/admin-nav-link";

type AdminNavMenuProps = {
    className?: string;
    show: boolean;
};

export default function AdminNavMenu({ className, show }: AdminNavMenuProps) {
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
                    <AdminNavLink
                        key={item.id}
                        item={item}
                    />
                ))}
            </ul>
        </div>
    );
}
