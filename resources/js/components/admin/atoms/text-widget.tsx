import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import InputError from './input-error';
import InputLabel from './input-label';
import InputSpan from './input-span';

type TextWidgetProps = {
    label: string;
    htmlFor: string;
    edit?: boolean;
    children: ReactNode;
    fallback?: ReactNode;
    fbClass?: string;
    labelClass?: string;
    className?: string;
    error?: string;
};

export function TextWidget({
    label,
    htmlFor,
    edit,
    children,
    fallback,
    fbClass,
    labelClass,
    className,
    error,
}: TextWidgetProps) {
    return (
        <div className={cn('grid content-start gap-4', className)}>
            <InputLabel
                className={labelClass}
                htmlFor={htmlFor}
            >
                {label}
            </InputLabel>

            {edit !== undefined ? (
                edit ? (
                    children
                ) : (
                    <InputSpan className={fbClass}>{fallback}</InputSpan>
                )
            ) : (
                children
            )}

            {error && (
                <InputError
                    className="mt-2"
                    message={error}
                />
            )}
        </div>
    );
}
