import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';

export default function notify(message: string) {
    toast.custom(
        (t) => (
            <div className="font-display text-white relative w-full max-w-md rounded-md border-2 border-white/20 bg-card-backdrop-gray p-4 font-medium backdrop-blur-sm">
                <button
                    onClick={() => toast.dismiss(t)}
                    className="absolute -top-2 -right-2 z-10 aspect-square cursor-pointer rounded-sm border-2 border-white/20 bg-card-backdrop-gray p-1 text-white backdrop-blur-sm transition-all duration-200 ease-in hover:scale-105"
                >
                    <XMarkIcon className="size-4 text-white" />
                </button>
                <div className="flex items-center gap-2">
                    <CheckIcon className="size-6 shrink-0 text-white" />
                    <p className="text-balance text-white">{message}</p>
                </div>
            </div>
        ),
        {
            duration: 3000,
        },
    );
}
