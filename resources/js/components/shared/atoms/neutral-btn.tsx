import { cn } from "@/lib/utils";

type NeutralBtnProps = {
    className?: string;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function NeutralBtn({
    className,
    children,
    ...props
}: NeutralBtnProps) {
    return (
        <button
            className={cn(
                'focus-visible:border-ring focus-visible:ring-ring/50 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-bright-salad px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-[color,box-shadow] outline-none hover:bg-lime-600 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-red-600 aria-invalid:ring-red-600/20 sm:px-6 sm:py-3 sm:text-base [&_svg]:pointer-events-none [&_svg]:shrink-0',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
