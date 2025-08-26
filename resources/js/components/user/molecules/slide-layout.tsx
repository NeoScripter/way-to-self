import { cn } from '@/lib/utils';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';

type SlideLayoutProps = {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
    className?: string;
};

export default function SlideLayout({
    show,
    children,
    onClose,
    className
}: SlideLayoutProps) {
    return (
        <Dialog
            open={show}
            onClose={onClose}
            className={cn("fixed inset-0 z-50 text-white overflow-y-auto", className)}
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/60 backdrop-blur-sm duration-300 ease-in-out data-[closed]:opacity-0 data-[closed]:translate-x-full"
            />

            <DialogPanel
                transition
                className={cn(
                    'relative z-50 h-max duration-300 ease-in-out data-[closed]:opacity-0 data-[closed]:translate-x-full',
                )}
            >
                {children}
            </DialogPanel>
        </Dialog>
    );
}
