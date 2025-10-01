import { cn } from '@/lib/utils';
import * as React from 'react';

export default function Input({ className, type, ...props }: React.ComponentProps<'input'>) {

    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'flex h-12 w-full min-w-0 rounded-lg border border-text-black bg-white px-4 py-1 text-center text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-bright-salad selection:text-white placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
                'focus-visible:border-ring focus-visible:ring-[2px] focus-visible:ring-dark-swamp/80',
                'aria-invalid:border-red-600 aria-invalid:ring-red-600/20',
                className,
            )}
            {...props}
        />
    );
}
