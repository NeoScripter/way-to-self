import React, { useEffect, useState } from 'react';

type ImgInputProps = {
    src?: string;
    isEdited: boolean;
    onChange: (file: File | null) => void;
    error?: string | null;
};

export default function ImgInput({
    src,
    isEdited,
    onChange,
    error,
}: ImgInputProps) {
    const [preview, setPreview] = useState<string | null>(src || null);
    const [loading, setLoading] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        console.log(file);
        setLoading(true);
        setPreview(URL.createObjectURL(file));
        onChange(file);

        // simulate async upload (replace with real upload if needed)
        setTimeout(() => setLoading(false), 800);
    };

    // reset preview if editing stops
    useEffect(() => {
        if (!isEdited) {
            setPreview(src || null);
            onChange(null);
            setLoading(false);
        }
    }, [isEdited, src, onChange]);

    return (
        <div className="flex flex-col gap-2">
            <div className="relative flex h-48 w-48 items-center justify-center rounded border">
                {loading && <div className="absolute">Loading...</div>}

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

            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}
