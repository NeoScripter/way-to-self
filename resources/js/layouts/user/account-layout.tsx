import AccountHeader from '@/components/account/molecules/account-header';
import Footer from '@/components/shared/molecules/footer';
import BackToTopBtn from '@/components/user/atoms/back-to-top-btn';
import FlashMessage from '@/components/user/atoms/flash-message';
import UserFooter from '@/components/user/molecules/user-footer';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

type AccountLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
    headerClass?: string;
};

export default function AccountLayout({
    children,
    layoutClass,
    pageClass,
    headerClass,
}: AccountLayoutProps) {
    const { flash } = usePage<{ flash: { message: string | null } }>().props;

    return (
        <div className={cn('relative z-5 min-h-screen', layoutClass)}>
            <AccountHeader className={headerClass} />

            <BackToTopBtn />

            {flash.message && <FlashMessage message={flash.message} />}

            <main className={cn(pageClass)}>{children}</main>

            <Footer />
        </div>
    );
}

