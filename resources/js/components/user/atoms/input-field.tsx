import { cn } from '@/lib/utils';
import { Field, Input, Label } from '@headlessui/react';

type InputFieldProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    value: string;
    error?: string;
    label: string;
    placeholder: string;
};

export default function InputField({
    onChange,
    className,
    value,
    error,
    label,
    placeholder,
}: InputFieldProps) {
    return (
        <Field className={cn('block w-full', className)}>
            <Label className="sr-only">{label}</Label>
            <Input
                className="ease h-full w-full rounded-full border-2 border-slate-200 bg-white px-5 py-2 text-sm md:text-base text-slate-700 shadow-sm transition duration-300 placeholder:text-gray-500 hover:border-light-swamp focus:border-light-swamp focus:shadow focus:outline-none sm:text-base"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error != null && (
                <div className="mt-2 text-red-500 text-sm md:text-base px-2">{error}</div>
            )}{' '}
        </Field>
    );
}
