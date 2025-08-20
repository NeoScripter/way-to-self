import AccountHeader from "@/components/account/molecules/account-header";
import BackToTopBtn from "@/components/user/atoms/back-to-top-btn";
import UserFooter from "@/components/user/molecules/user-footer";
import { cn } from "@/lib/utils";

type AccountLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
    headerClass?: string;
}

export default function AccountLayout({ children, layoutClass, pageClass, headerClass }: AccountLayoutProps) {
    return (
        <div className={cn("min-h-screen relative z-5", layoutClass)}>

            <AccountHeader className={headerClass} />

            <BackToTopBtn />

            <main className={cn(pageClass)}>
                {children}
            </main>

            <UserFooter />
        </div>
    )
}
