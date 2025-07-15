import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

type SecondaryBtnProps = {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function SecondaryBtn({ children, href, onClick, className }: SecondaryBtnProps) {
    const baseClass = cn("rounded-full block cursor-pointer w-max border-2 border-white text-white py-[0.75em] px-[1.25em] text-center cursor-pointer transition-colors duration-200 ease-in-out hover:text-bright-salad hover:border-bright-salad", className);

    if (href != null) {
        return <Link href={href} className={baseClass}>{children}</Link>
    } else {
        return <button onClick={onClick} className={baseClass}>{children}</button>
    }
}
