import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

type RedBtnProps = {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function RedBtn({ children, href, onClick, className }: RedBtnProps) {
    const baseClass = cn("rounded-full block cursor-pointer w-max bg-red-purple border-1 border-white text-white py-[0.75em] px-[1.25em] text-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-red-bright", className);

    if (href != null) {
        return <Link href={href} className={baseClass}>{children}</Link>
    } else {
        return <button onClick={onClick} className={baseClass}>{children}</button>
    }
}
