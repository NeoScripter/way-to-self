import { cn } from '@/lib/utils';
import { Field, Label, Switch } from '@headlessui/react';

type ToggleBtnProps = {
    color?: string;
    className?: string;
    checked: boolean;
    label: string;
    handleChange: () => void;
};

export default function ToggleBtn({
    className,
    color,
    checked,
    label,
    handleChange,
}: ToggleBtnProps) {
    return (
        <Field className={cn('flex items-center gap-6', className)}>
            <Switch
                checked={checked}
                onChange={handleChange}
                className={cn(
                    'group inline-flex h-8 w-16 cursor-pointer items-center rounded-full bg-gray-200 transition',
                    color,
                )}
            >
                <span className="size-6 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-9" />
            </Switch>
            <Label className="cursor-pointer text-sm font-medium sm:text-base">
                {label}
            </Label>
        </Field>
    );
}
