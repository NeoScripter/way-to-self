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
    error?: string;
    textarea?: boolean;
    textleft?: boolean;
};

export function TextWidget({
    label,
    htmlFor,
    edit,
    children,
    fallback,
    error,
    textarea = false,
    textleft = false,
}: TextWidgetProps) {
    return (
        <div className="grid content-start gap-4">
            <InputLabel htmlFor={htmlFor}>{label}</InputLabel>

            {edit !== undefined ? (
                edit ? (
                    children
                ) : (
                    <InputSpan
                        className={cn(
                            textarea && 'block py-2 min-h-40 text-left',
                            textleft && 'text-left justify-start',
                        )}
                    >
                        {fallback}
                    </InputSpan>
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
