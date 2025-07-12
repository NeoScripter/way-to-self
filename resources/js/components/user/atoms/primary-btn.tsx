import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

type PrimaryBtnProps = {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function PrimaryBtn({ children, href, onClick, className }: PrimaryBtnProps) {
    const baseClass = cn("rounded-full block cursor-pointer w-max bg-dark-green text-white py-[0.75em] px-[1.25em] text-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-dark-green/90", className);

    if (href != null) {
        return <Link href={href} className={baseClass}>{children}</Link>
    } else {
        return <button onClick={onClick} className={baseClass}>{children}</button>
    }
}
