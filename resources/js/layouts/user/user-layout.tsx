import BackToTopBtn from '@/components/user/atoms/back-to-top-btn';
import FlashMessage from '@/components/user/atoms/flash-message';
import UserFooter from '@/components/user/molecules/user-footer';
import UserHeader from '@/components/user/molecules/user-header';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

type UserLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
    headerClass?: string;
};

export default function UserLayout({
    children,
    layoutClass,
    pageClass,
    headerClass,
}: UserLayoutProps) {
    const { flash } = usePage<{ flash: { message: string | null } }>().props;

    return (
        <div className={cn('relative z-5 min-h-screen', layoutClass)}>
            <UserHeader className={headerClass} />

            <BackToTopBtn />

            {flash.message && <FlashMessage message={flash.message} />}

            <main className={cn(pageClass)}>{children}</main>

            <UserFooter />

        </div>
    );
}
