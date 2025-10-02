import Placeholder from '@/assets/images/shared/placeholder.webp';
import { cn } from '@/lib/utils';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import React, { useId, useState } from 'react';

type ImgInputProps = {
    src?: string;
    isEdited: boolean;
    onChange: (file: File | null) => void;
    error?: string;
    progress?: ProgressEvent;
};

export default function ImgInput({
    src,
    isEdited,
    onChange,
    error,
    progress,
}: ImgInputProps) {
    const [preview, setPreview] = useState(src);
    const id = useId();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    return (
        <div className="flex items-center gap-6">
            {isEdited && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="mt-1 hidden"
                    id={id}
                />
            )}

            <label
                htmlFor={id}
                className={cn("flex h-fit text-sm cursor-pointer items-center gap-2 rounded-md bg-slate-800 px-6 py-3 text-white", !isEdited && "opacity-50 cursor-not-allowed")}
            >
                <ArrowDownTrayIcon className="size-5" />
                Фото для превью
            </label>

            <div className="relative flex size-35 items-center justify-center">
                <img
                    src={preview ?? Placeholder}
                    alt="Preview"
                    className="h-full w-full rounded object-cover"
                />
            </div>

            {progress != null && <div className="">Loading...</div>}
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}
