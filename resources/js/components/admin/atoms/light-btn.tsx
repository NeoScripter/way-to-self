import { cn } from '@/lib/utils';

type LightBtnProps = {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    isActive?: boolean;
};

export default function LightBtn({
    onClick,
    className,
    children,
    type = 'button',
    isActive = false,
}: LightBtnProps) {
    return (
        <button
            type={type}
            className={cn(
                'isabled:pointer-events-none flex w-full max-w-100 cursor-pointer justify-between rounded-lg bg-white px-[1.25em] py-[0.75em] text-center text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:opacity-50 md:text-base',
                isActive
                    ? 'bg-pale-swamp/20 text-light-swamp shadow-sm ring-1 shadow-pale-swamp ring-pale-swamp'
                    : 'd border border-text-black hover:ring-[3px] hover:ring-gray-600/20 focus-visible:ring-[3px] focus-visible:ring-gray-600/20',

                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
