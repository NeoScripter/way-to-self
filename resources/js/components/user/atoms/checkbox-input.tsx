import { cn } from '@/lib/utils';
import { Checkbox, Field, Label } from '@headlessui/react';

type CheckboxInputProps = {
    checked: boolean | undefined;
    onChange: ((checked: boolean) => void) | undefined;
    labelClassName?: string;
    checkboxClassName?: string;
    children: React.ReactNode;
};

export default function CheckboxInput({
    checked,
    onChange,
    labelClassName,
    checkboxClassName,
    children,
}: CheckboxInputProps) {
    return (
        <Field className={cn('flex items-center gap-4', labelClassName)}>
            <Checkbox
                checked={checked}
                onChange={onChange}
                className={cn(
                    'group block size-12 shrink-0 cursor-pointer rounded-sm bg-white data-checked:bg-bright-salad',
                    checkboxClassName,
                )}
            >
                {/* Checkmark icon */}
                <svg
                    className="stroke-white opacity-0 group-data-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path
                        transform="translate(0, -1)"
                        d="M3 8L6 11L11 5.5"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Checkbox>
            <Label className="block w-full">{children}</Label>
        </Field>
    );
}
