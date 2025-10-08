import Placeholder from '@/assets/images/shared/placeholder.webp';
import DialogLayout from '@/components/user/molecules/dialog-layout';
import { cn } from '@/lib/utils';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import type { AxiosProgressEvent } from 'axios';
import { Check } from 'lucide-react';
import React, { useId, useState } from 'react';

type ImgInputProps = {
    src?: string;
    isEdited: boolean;
    onChange: (file: File | null) => void;
    error?: string;
    progress?: AxiosProgressEvent | null;
    altText: string;
    altError?: string;
    onAltChange: (value: string) => void;
    label?: string;
};

export default function ImgInput({
    src,
    isEdited,
    onChange,
    error,
    progress,
    altText,
    altError,
    onAltChange,
    label = 'Главное фото',
}: ImgInputProps) {
    const [preview, setPreview] = useState(src);
    const id = useId();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    const [showPopup, setShowPopup] = useState(false);

    const showCheckMark =
        progress &&
        progress.percentage &&
        progress.percentage > 98 &&
        preview !== src;
    const showLoadingRing =
        progress &&
        progress.percentage &&
        progress.percentage < 98 &&
        preview !== src;

    return (
        <div>
            <p className="mb-2 text-center md:text-left font-semibold sm:text-lg">{label}</p>
            <div className="flex max-w-140 flex-col items-center justify-between gap-10 md:flex-row">
                {isEdited && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="mt-1 hidden"
                        id={id}
                        name={`image-input-${id}`}
                    />
                )}

                <div className="shrink-0">
                    <label
                        htmlFor={id}
                        className={cn(
                            'flex h-fit cursor-pointer items-center gap-2 rounded-md bg-slate-800 px-6 py-3 text-sm text-white transition-opacity duration-200 focus-within:opacity-90 hover:opacity-90',
                            !isEdited && 'cursor-not-allowed opacity-50',
                        )}
                    >
                        <ArrowDownTrayIcon className="size-5" />
                        Загрузить фото
                    </label>

                    {isEdited && (
                        <AltInput
                            altText={altText}
                            altError={altError}
                            onAltChange={onAltChange}
                        />
                    )}
                </div>
                <div>
                    <div
                        onClick={() => setShowPopup(true)}
                        className="relative transition-scale duration-200 ease-in hover:scale-110 flex size-35 cursor-pointer items-center justify-center"
                    >
                        <img
                            src={preview ?? Placeholder}
                            alt="Preview"
                            className="h-full w-full rounded object-cover"
                        />
                    </div>
                    {error && (
                        <span className="block max-w-35 text-sm text-red-500">
                            {error}
                        </span>
                    )}
                </div>

                {showCheckMark || showLoadingRing && <div className="relative flex aspect-square size-20 flex-wrap place-content-center text-xs font-bold">
                    {showLoadingRing && <LoadingRing />}

                    {showLoadingRing && (
                        <span>{`${progress.percentage}%`}</span>
                    )}

                    {showCheckMark && (
                        <div className="flex size-8 animate-fade flex-wrap place-content-center rounded-full bg-bright-salad">
                            <Check className="text-white" />
                        </div>
                    )}
                </div>}
            </div>

            <DialogLayout
                show={showPopup}
                onClose={() => setShowPopup(false)}
                className="mx-auto w-fit max-w-260"
            >
                {' '}
                <div className='w-fit mx-auto'>
                    <img
                        src={preview}
                        alt={altText}
                    />
                </div>
            </DialogLayout>
        </div>
    );
}

type AltInputProps = {
    altText: string;
    altError?: string;
    onAltChange: (value: string) => void;
};

function AltInput({ altText, altError, onAltChange }: AltInputProps) {
    const id = useId();

    return (
        <div className="grid gap-1 text-xs">
            <label
                htmlFor={id}
                className="mt-3"
            >
                Альтернативный текст для фото
            </label>
            <textarea
                name="Альтернативный текст"
                id={id}
                value={altText}
                onChange={(e) => onAltChange(e.target.value)}
                className="focus-visible:border-ring min-h-15 rounded-sm border border-zinc-700 p-1 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[2px] focus-visible:ring-dark-swamp/80"
            />
            <span className="font-medium text-red-600">{altError}</span>
        </div>
    );
}

function LoadingRing() {
    return Array(20)
        .fill(1)
        .map((_, i) => {
            const angle = (i * 360) / 20;
            return (
                <span
                    className="absolute top-1/2 left-1/2 block h-3 w-[3px] -translate-1/2 animate-shimmer bg-black"
                    style={{
                        transform: `rotate(${angle}deg) translateY(-${30}px`,
                        transformOrigin: 'center center',
                        animationDelay: `${angle * 4}ms`,
                    }}
                    key={`bar-${i}`}
                />
            );
        });
}
