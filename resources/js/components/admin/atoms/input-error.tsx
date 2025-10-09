import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={cn('text-sm font-medium mx-auto max-w-100 sm:text-base text-center text-balance bg-red-600 mt-1 text-white py-1 px-3 tracking-wider', className)}>
            {message}
        </p>
    ) : null;
}
