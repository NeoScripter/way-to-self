import { cn } from "@/lib/utils";

type SpanHighlightProps = {
    className?: string;
    text: string;
}

export default function SpanHighlight({ className, text }: SpanHighlightProps) {
    return (
        <span className={cn("bg-bright-salad leading-[0.4em] h-[0.4em] pb-[0.1em] px-[0.2em] flex items-center w-max font-cursive", className)}>{text}</span>
    )
}
