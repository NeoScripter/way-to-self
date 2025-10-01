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
};

export function TextWidget({
    label,
    htmlFor,
    edit,
    children,
    fallback,
    error,
}: TextWidgetProps) {
    return (
        <div className="grid content-start gap-4">
            <InputLabel htmlFor={htmlFor}>{label}</InputLabel>

            {edit !== undefined ? (
                edit ? (
                    children
                ) : (
                    <InputSpan>{fallback}</InputSpan>
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
