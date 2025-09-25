import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { MoveLeft } from 'lucide-react';
import BreadCrumbs from './breadcrumbs';

type NavReturnProps = {
    routeName: string;
    className?: string;
    badge: string;
    label: string;
};

export default function NavReturn({
    routeName,
    className,
    badge,
    label,
}: NavReturnProps) {
    const Label = () => (
        <div className="flex items-center gap-3">
            <MoveLeft className="mt-0.5 size-5" />{' '}
            <span className="block">{label}</span>
        </div>
    );

    return (
        <Link
            href={routeName}
            prefetch
            preserveState
            as="button"
            className={cn(
                'cursor-pointer transition-colors duration-200 ease-in-out hover:text-bright-salad',
                className,
            )}
        >
            <BreadCrumbs
                label={<Label />}
                badge={badge}
                className="gap-3"
            />
        </Link>
    );
}
