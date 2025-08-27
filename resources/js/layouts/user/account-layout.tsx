import AccountHeader from '@/components/account/molecules/account-header';
import BackToTopBtn from '@/components/user/atoms/back-to-top-btn';
import UserFooter from '@/components/user/molecules/user-footer';
import { cn } from '@/lib/utils';
import { ToastContainer, Zoom } from 'react-toastify';

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
    return (
        <div className={cn('relative z-5 min-h-screen', layoutClass)}>
            <AccountHeader className={headerClass} />

            <BackToTopBtn />

            <main className={cn(pageClass)}>{children}</main>

            <UserFooter />

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Zoom}
            />
        </div>
    );
}
