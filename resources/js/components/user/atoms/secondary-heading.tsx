import { cn } from "@/lib/utils";

type SecondaryHeadingProps = {
    text: string;
    className?: string;
}

export default function SecondaryHeading({ text, className }: SecondaryHeadingProps) {
    return (
        <h4 className={cn("text-dark-swamp text-center font-heading text-5xl sm:text-6xl", className)}>{text}</h4>
    )
}
