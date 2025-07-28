import BackToTopBtn from "@/components/user/atoms/back-to-top-btn";
import UserFooter from "@/components/user/molecules/user-footer";
import UserHeader from "@/components/user/molecules/user-header";
import { cn } from "@/lib/utils";

type UserLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
    headerClass?: string;
}

export default function UserLayout({ children, layoutClass, pageClass, headerClass }: UserLayoutProps) {
    return (
        <div className={cn("min-h-screen relative z-5", layoutClass)}>

            <UserHeader className={headerClass} />

            <BackToTopBtn />

            <main className={cn(pageClass)}>
                {children}
            </main>

            <UserFooter />
        </div>
    )
}
