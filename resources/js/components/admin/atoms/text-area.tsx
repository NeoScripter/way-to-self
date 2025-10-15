import { cn } from '@/lib/utils';
import * as React from 'react';

export default function TextArea({
    className,
    ...props
}: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                'flex min-h-40 w-full min-w-0 rounded-lg border border-text-black bg-white px-4 py-2 text-left text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-bright-salad selection:text-white placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
                'focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-dark-swamp/80',
                'aria-invalid:border-red-600 aria-invalid:ring-red-600/20',
                className,
            )}
            {...props}
        />
    );
}
