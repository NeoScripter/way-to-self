import { cn } from "@/lib/utils";

type HomeCardLayoutProps = {
    children: React.ReactNode;
    ariaLabel: string;
    ariaDesc: string;
    className?: string;
}

export default function HomeCardLayout({ children, ariaDesc, ariaLabel, className }: HomeCardLayoutProps) {
    return (
        <article
            className={cn("rounded-[6rem] border-2 border-white/20 relative backdrop-blur-sm bg-card-backdrop-gray/50 px-9 pb-8 mb-28 sm:mb-9 sm:py-11 sm:px-10 sm:w-full lg:mb-18 xl:mb-14 lg:px-15.5 lg:py-8.5 2xl:px-17.5 2xl:pb-14", className)}
            aria-labelledby={ariaLabel}
            aria-describedby={ariaDesc}
        >
            {children}
        </article>
    )
}
