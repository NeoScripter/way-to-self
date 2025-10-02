import React, { useState } from 'react';

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

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="relative flex h-48 w-48 items-center justify-center rounded border">
                {progress != null && <div className="absolute">Loading...</div>}

                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full rounded object-cover"
                    />
                ) : (
                    <div className="text-gray-400">No image</div>
                )}
            </div>

            {isEdited && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="mt-1"
                />
            )}

            <span className="text-sm text-red-500">Erro</span>
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}
