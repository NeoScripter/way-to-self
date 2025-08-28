import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type FlashMessageProps = {
    message: string | null;
};
export default function FlashMessage({ message }: FlashMessageProps) {
    const [show, setShow] = useState(true);

    function setFadeOutTimeout() {
        return setTimeout(() => {
            setShow(false);
        }, 3000);
    }

    useEffect(() => {
        let timeout = setFadeOutTimeout();

        let removeEvent = router.on('before', () => {
            setShow(true);
        });

        return () => {
            clearTimeout(timeout);
            removeEvent();
        };
    });

    if (!show) return null;

    return createPortal(
        <div className="font-display fixed top-20 left-1/2 z-300 w-full max-w-70 -translate-x-1/2 rounded-md border-2 border-white/20 bg-card-backdrop-gray px-2 font-medium text-white backdrop-blur-sm">
            <button
                onClick={() => setShow(false)}
                className="absolute -top-2 -right-2 aspect-square shrink-0 cursor-pointer rounded-sm border-2 border-white/20 bg-card-backdrop-gray p-1 text-white backdrop-blur-sm transition-all duration-200 ease-in focus-within:scale-110 hover:scale-105 hover:bg-zinc-700/60"
            >
                <XMarkIcon className="size-4" />
            </button>
            <div className="flex items-center justify-center p-2">
                <p className="flex items-center gap-2 text-center text-balance">
                    <CheckIcon className="size-7 text-white" />
                    {message}
                </p>
            </div>
        </div>,
        document.getElementById('portal-container')!,
    );
}
