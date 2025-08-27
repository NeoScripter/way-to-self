import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { toast, ToastContentProps } from 'react-toastify';

type CustomNotificationProps = ToastContentProps<{
    content: string;
}>;

function CustomNotification({ closeToast, data }: CustomNotificationProps) {
    return (
        <div className="font-display w-full font-medium">
            <button
                onClick={closeToast}
                className="absolute -top-2 -right-2 aspect-square cursor-pointer rounded-sm border-2 border-white/20 bg-card-backdrop-gray p-1 text-white backdrop-blur-sm transition-all duration-200 ease-in focus-within:scale-110 hover:scale-105 hover:bg-zinc-700/60"
            >
                <XMarkIcon className="size-4" />
            </button>
            <div className="flex items-center justify-center p-2">
                <p className="text-center text-balance flex items-center gap-2">
                    <CheckIcon className="size-7 text-white" />
                    {data.content}
                </p>
            </div>
        </div>
    );
}

export default function notify(message: string) {
    toast(CustomNotification, {
        data: { content: message },
        autoClose: 3000,
        closeButton: false,
        className:
            '!border-2 !border-white/20 !bg-card-backdrop-gray !backdrop-blur-sm !rounded-md relative',
    });
}
