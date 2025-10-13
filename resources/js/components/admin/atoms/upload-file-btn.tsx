import { cn } from '@/lib/utils';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

type UploadFileBtnProps = {
    disabled: boolean;
    label: string;
    id: string;
};

export default function UploadFileBtn({
    label,
    disabled,
    id,
}: UploadFileBtnProps) {
    return (
        <label
            htmlFor={id}
            className={cn(
                'flex h-fit w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-800 px-6 py-3 text-sm text-white transition-opacity duration-200 focus-within:opacity-90 hover:opacity-90',
                disabled && 'cursor-not-allowed opacity-50',
            )}
        >
            <ArrowDownTrayIcon className="size-5" />
            {label}
        </label>
    );
}
