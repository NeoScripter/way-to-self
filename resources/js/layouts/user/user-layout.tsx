import UserHeader from "@/components/user/molecules/user-header";
import { cn } from "@/lib/utils";

type UserLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
}

export default function UserLayout({ children, layoutClass, pageClass }: UserLayoutProps) {
    return (
        <div className={cn("min-h-screen", layoutClass)}>

            <UserHeader />

            <main className={cn("", pageClass)}>
                {children}
            </main>
        </div>
    )
}
