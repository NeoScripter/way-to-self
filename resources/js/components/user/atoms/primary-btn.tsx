import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

type PrimaryBtnProps = {
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
}

export default function PrimaryBtn({ children, href, onClick, className, type }: PrimaryBtnProps) {
    const baseClass = cn("bg-gradient-to-r rounded-full from-light-swamp via-dark-swamp py-[0.75em] px-[1.25em] text-center cursor-pointer block w-max text-white to-dark-green hover:bg-gradient-to-br focus:ring-4 focus:outline-none transition duration-200 ease-in-out focus:ring-light-swamp dark:focus:ring-dark-green shadow-lg shadow-dark-green/50 dark:shadow-lg dark:shadow-dark-green/80", className);

    if (href != null) {
        return <Link as="button" href={href} className={baseClass}>{children}</Link>
    } else {
        return <button type={type ? type : 'button'} onClick={onClick} className={baseClass}>{children}</button>
    }
}
