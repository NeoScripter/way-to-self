import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

type FlashMessageProps = {
    message: string | null;
};
export default function FlashMessage({ message }: FlashMessageProps) {
    const [showToast, setShowToast] = useState(message != null);

    // useEffect(() => {
    //     if (!message) return;

    //     const timer = setTimeout(() => {
    //         setShowToast(false);
    //     }, 3000); // 3 seconds

    //     return () => clearTimeout(timer);
    // }, [message]);

    if (!showToast || !message) return null;

    return (
        <div className="font-display fixed top-20 left-1/2 z-50 -translate-x-1/2 text-white max-w-70 px-2 w-full rounded-md border-2 border-white/20 bg-card-backdrop-gray font-medium backdrop-blur-sm">
            <button
                onClick={() => setShowToast(false)}
                className="absolute -top-2 -right-2 aspect-square cursor-pointer rounded-sm shrink-0 border-2 border-white/20 bg-card-backdrop-gray p-1 text-white backdrop-blur-sm transition-all duration-200 ease-in focus-within:scale-110 hover:scale-105 hover:bg-zinc-700/60"
            >
                <XMarkIcon className="size-4" />
            </button>
            <div className="flex items-center justify-center p-2">
                <p className="flex items-center gap-2 text-center text-balance">
                    <CheckIcon className="size-7 text-white" />
                    {message}
                </p>
            </div>
        </div>
    );
}
