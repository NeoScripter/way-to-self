import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

type LogoProps = {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <div className={cn("font-cursive", className)}>
            <Link as="button" href="/" className="cursor-pointer text-inherit no-underline" aria-label="Главная страница" rel="home">
                <span className="sr-only">Мария Юданова — логотип</span>
                <span aria-hidden="true">Мария Юданова</span>
            </Link>
        </div>
    )
}
