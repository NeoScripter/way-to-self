import ShowInputBtn from '@/components/user/atoms/show-input-btn';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function PasswordInput({
    className,
    ...props
}: React.ComponentProps<'input'>) {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className={cn('relative', className)}>
            <input
                type={showInput ? 'text' : 'password'}
                data-slot="input"
                className={cn(
                    'flex h-12 w-full min-w-0 rounded-lg border border-text-black bg-white px-4 py-1 text-center text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-bright-salad placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
                    'focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-gray-100/20',
                    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                    className,
                )}
                {...props}
            />
            <ShowInputBtn
                showInput={showInput}
                onClick={() => setShowInput((o) => !o)}
            />
        </div>
    );
}
