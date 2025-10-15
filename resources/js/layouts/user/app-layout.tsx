import ErrorFallback from '@/components/shared/molecules/error-fallback';
import Footer from '@/components/shared/molecules/footer';
import Header from '@/components/shared/organisms/header';
import BackToTopBtn from '@/components/user/atoms/back-to-top-btn';
import FlashMessage from '@/components/user/atoms/flash-message';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { ErrorBoundary } from 'react-error-boundary';

type AppLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
    headerClass?: string;
    variant: string;
};

export default function AppLayout({
    children,
    layoutClass,
    pageClass,
    headerClass,
    variant,
}: AppLayoutProps) {
    const { flash } = usePage<{ flash: { message: string | null } }>().props;

    return (
        <div className={cn('relative z-5', layoutClass)}>
            <Header
                variant={variant}
                className={headerClass}
            />

            <BackToTopBtn />

            {flash.message && <FlashMessage message={flash.message} />}

            <main className={cn(pageClass)}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    {children}
                </ErrorBoundary>
            </main>

            <Footer />
        </div>
    );
}
