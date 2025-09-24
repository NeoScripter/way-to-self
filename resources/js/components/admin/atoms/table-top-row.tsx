import { cn } from '@/lib/utils';

type TableTopRowProps = {
    items: string[];
    className?: string;
};

export default function TableTopRow({ items, className }: TableTopRowProps) {
    return (
        <div
            className={cn(
                'my-9 flex items-center justify-between gap-2 text-pale-gray',
                className,
            )}
        >
            {items.map((item, idx) => (
                <span
                    key={idx}
                    className="text-center first-of-type:text-left last-of-type:text-right"
                >
                    {item}
                </span>
            ))}
        </div>
    );
}
