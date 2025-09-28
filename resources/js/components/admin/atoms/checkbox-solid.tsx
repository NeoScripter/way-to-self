import { cn } from '@/lib/utils';
import { Checkbox, Field, Label } from '@headlessui/react';

type CheckboxSolidProps = {
    checked: boolean | undefined;
    onChange: ((checked: boolean) => void) | undefined;
    labelClassName?: string;
    checkboxClassName?: string;
    children?: React.ReactNode;
    error?: string;
};

export default function CheckboxSolid({
    checked,
    onChange,
    labelClassName,
    checkboxClassName,
    children,
    error,
}: CheckboxSolidProps) {
    return (
        <div>
            <Field className={cn('flex items-center gap-4', labelClassName)}>
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    className={cn(
                        'group relative block size-5 shrink-0 cursor-pointer rounded-sm border border-slate-200 bg-white',
                        checkboxClassName,
                    )}
                >
                    <span className="linear absolute inset-0 m-auto block size-2/3 scale-10 rounded-xs bg-bright-salad opacity-0 transition-[opacity,scale] duration-200 group-data-checked:scale-100 group-data-checked:opacity-100"></span>
                </Checkbox>
                {children && <Label className="block w-full">{children}</Label>}
            </Field>
            {error != null && (
                <div className="mt-2 px-2 text-sm text-red-500 md:text-base">
                    {error}
                </div>
            )}{' '}
        </div>
    );
}
