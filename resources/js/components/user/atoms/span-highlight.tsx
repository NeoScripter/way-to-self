import { cn } from '@/lib/utils';

type SpanHighlightProps = {
    className?: string;
    text: string;
};

export default function SpanHighlight({ className, text }: SpanHighlightProps) {
    return (
        <span
            className={cn(
                'flex h-[0.4em] w-max items-center bg-bright-salad px-[0.2em] pb-[0.1em] font-cursive leading-[0.4em] select-none',
                className,
            )}
        >
            {text}
        </span>
    );
}
