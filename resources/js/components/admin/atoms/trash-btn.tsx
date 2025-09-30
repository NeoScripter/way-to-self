import { cn } from '@/lib/utils';
import { TrashIcon } from '@heroicons/react/24/solid';

type TrashBtnProps = {
    className?: string;
    onClick: () => void;
    label?: string;
    size?: string;
};

export default function TrashBtn({
    className,
    onClick,
    label,
    size,
}: TrashBtnProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'ease flex cursor-pointer items-center gap-1 text-red-700 transition-colors duration-200 hover:text-red-500',
                className,
            )}
        >
            <TrashIcon className={cn('size-6', size)} />
            {label != null && label}
        </button>
    );
}
