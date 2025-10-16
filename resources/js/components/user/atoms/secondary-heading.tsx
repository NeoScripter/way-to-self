import { cn } from '@/lib/utils';

type SecondaryHeadingProps = {
    text: string;
    className?: string;
};

export default function SecondaryHeading({
    text,
    className,
}: SecondaryHeadingProps) {
    return (
        <h4
            className={cn(
                'text-center relative z-11 font-heading text-5xl text-dark-swamp sm:text-6xl',
                className,
            )}
        >
            {text}
        </h4>
    );
}
