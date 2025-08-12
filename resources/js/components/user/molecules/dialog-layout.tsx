import { cn } from '@/lib/utils';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';

type DialogLayoutProps = {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
    className?: string;
};

export default function DialogLayout({
    show,
    children,
    onClose,
    className
}: DialogLayoutProps) {
    return (
        <Dialog
            open={show}
            onClose={onClose}
            className={cn("fixed inset-0 z-50 flex items-center justify-center overflow-y-auto", className)}
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 backdrop-blur-sm duration-300 ease-in-out data-[closed]:opacity-0"
            />

            <DialogPanel
                transition
                className={cn(
                    'relative z-50 h-max w-9/10 duration-300 ease-in-out data-[closed]:scale-40 data-[closed]:opacity-0',
                )}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 flex size-8 md:size-12 cursor-pointer items-center justify-center text-white/75 opacity-50 transition-opacity duration-200 ease-in hover:opacity-100"
                >
                    <X className="size-10" />
                </button>
                {children}
            </DialogPanel>
        </Dialog>
    );
}
