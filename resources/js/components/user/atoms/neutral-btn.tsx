import { cn } from '@/lib/utils';


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
                'flex cursor-pointer items-center justify-center gap-2 rounded-full bg-bright-salad px-4 py-2 font-medium whitespace-nowrap text-white shadow-xs transition-[color,box-shadow] outline-none hover:bg-lime-600 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 sm:px-6 sm:py-3 sm:text-base [&_svg]:pointer-events-none [&_svg]:shrink-0',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
