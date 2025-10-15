import { cn } from '@/lib/utils';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

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
    className,
}: SlideLayoutProps) {
    return (
        <Dialog
            open={show}
            onClose={onClose}
            className={cn(
                'fixed inset-0 z-50 overflow-y-auto text-white',
                className,
            )}
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/60 backdrop-blur-sm duration-300 ease-in-out data-[closed]:translate-x-full data-[closed]:opacity-0"
            />

            <DialogPanel
                transition
                className={cn(
                    'relative z-50 h-max duration-300 ease-in-out data-[closed]:translate-x-full data-[closed]:opacity-0',
                )}
            >
                {children}
            </DialogPanel>
        </Dialog>
    );
}
