import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={cn(
                'mx-auto mt-1 max-w-100 bg-red-600 px-3 py-1 text-center text-sm font-medium tracking-wider text-balance text-white sm:text-base',
                className,
            )}
        >
            {message}
        </p>
    ) : null;
}
