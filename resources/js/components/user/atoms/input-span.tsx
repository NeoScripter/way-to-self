import { cn } from "@/lib/utils";

type InputSpanProps = {
    children: React.ReactNode;
    className?: string;
};

export default function InputSpan({ children, className }: InputSpanProps) {
    return (
        <span
            className={cn(
                'mt-1 flex h-12 w-full min-w-0 items-start justify-center rounded-full border bg-white px-4 py-1 text-center text-sm shadow-xs outline-none md:text-base',
                className,
            )}
        >
            {children}
        </span>
    );
}
