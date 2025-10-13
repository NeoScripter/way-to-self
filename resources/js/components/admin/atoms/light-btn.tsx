import { cn } from '@/lib/utils';

type LightBtnProps = {
    handleClick: () => void;
    className?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
};

export default function LightBtn({
    handleClick,
    className,
    children,
    type = 'button',
}: LightBtnProps) {
    return (
        <button
            type={type}
            className={cn(
                'flex w-100 max-w-full cursor-pointer justify-between rounded-lg border border-text-black bg-white px-[1.25em] py-[0.75em] text-center text-sm text-text-black shadow-xs transition-[color,box-shadow] outline-none hover:ring-[3px] hover:ring-gray-600/20 focus-visible:ring-[3px] focus-visible:ring-gray-600/20 disabled:pointer-events-none disabled:opacity-50 md:text-base',
                className,
            )}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
