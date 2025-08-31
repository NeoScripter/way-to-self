import Footer from '@/components/shared/molecules/footer';
import TierHeader from '@/components/shared/organisms/tier-header';
import BackToTopBtn from '@/components/user/atoms/back-to-top-btn';
import FlashMessage from '@/components/user/atoms/flash-message';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

type TierLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
    headerClass?: string;
};

export default function TierLayout({
    children,
    layoutClass,
    pageClass,
    headerClass,
}: TierLayoutProps) {
    const { flash } = usePage<{ flash: { message: string | null } }>().props;

    return (
        <div className={cn('relative z-5 min-h-screen', layoutClass)}>
            <TierHeader className={headerClass} />

            <BackToTopBtn />

            {flash.message && <FlashMessage message={flash.message} />}

            <main className={cn(pageClass)}>{children}</main>

            <Footer />
        </div>
    );
}
