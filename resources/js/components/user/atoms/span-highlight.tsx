import { cn } from '@/lib/utils';

type SpanHighlightProps = {
    className?: string;
    text: string;
};

export default function SpanHighlight({ className, text }: SpanHighlightProps) {
    return (
        <span
            className={cn(
                'flex h-[0.6em] w-max items-center bg-bright-salad px-[0.2em] pb-[0.1em] mt-[0.1em] text-[2.4rem] text-white sm:text-[4rem] lg:text-[6rem] font-cursive leading-[0.4em] select-none',
                className,
            )}
        >
            {text}
        </span>
    );
}
