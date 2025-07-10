import { cn } from "@/lib/utils";

type UserLayoutProps = {
    children: React.ReactNode;
    layoutClass?: string;
    pageClass?: string;
}

export default function UserLayout({ children, layoutClass, pageClass }: UserLayoutProps) {
    return (
        <div className={cn("min-h-screen", layoutClass)}>

            <header className="flex items-center justify-between border-b border-gray-200 text-white mx-7">
                <div className="font-cursive text-4xl sm:text-6xl mt-2.5 sm:mt-5 sm:mb-4 mb-2 ml-1">Мария Юданова</div>

                <NavMenu />

                <MobileBtn className="mt-2"/>
            </header>

            <main className={cn("", pageClass)}>
                {children}
            </main>
        </div>
    )
}

type NavMenuProps = {
   className?: string;
}

function NavMenu ({className}: NavMenuProps) {
    return (
        <nav className={cn("bg-light-swamp fixed top-0 left-0 right-0 z-10 h-175 max-h-screen", className)}>
            this is nav
        </nav>
    )
}

type MobileBtnProps = {
    className?: string;
}

function MobileBtn({className}: MobileBtnProps) {
    return (
        <button className={cn("group relative overflow-clip cursor-pointer w-8 h-4 sm:w-13 sm:h-6", className)}>
            <span className="shine-element block group-hover:animate-[shine_750ms]"></span>
            <svg
                fill="none"
                height="100%"
                viewBox="0 0 34 18"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 1H32"
                    stroke="white"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    strokeWidth="2"
                />
                <path
                    d="M10 9L32.4902 9"
                    stroke="white"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    strokeWidth="2"
                />
                <path
                    d="M17 17L32.5 17"
                    stroke="white"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    strokeWidth="2"
                />
            </svg>
        </button>
    )
}
