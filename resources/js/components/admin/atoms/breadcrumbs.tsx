import { cn } from '@/lib/utils';

type BreadCrumbsProps = {
    className?: string;
    label: React.ReactNode;
    badge: string;
};

export default function BreadCrumbs({
    className,
    label,
    badge,
}: BreadCrumbsProps) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            {label}
            <span className="rounded-sm bg-dark-green px-1 py-0.5 text-xs text-white">
                {badge}
            </span>
        </div>
    );
}
