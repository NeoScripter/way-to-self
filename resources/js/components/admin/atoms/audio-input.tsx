import { usePage } from '@inertiajs/react';
import type { AxiosProgressEvent } from 'axios';
import React, { useId, useState } from 'react';
import { HlsPlayer } from './hls-player';
import LoadingRing from './loading-ring';
import UploadFileBtn from './upload-file-btn';

type AudioInputProps = {
    isEdited: boolean;
    onChange: (file: File | null) => void;
    error?: string;
    progress?: AxiosProgressEvent | null;
    label?: string;
};

export default function AudioInput({
    isEdited,
    onChange,
    error,
    progress,
    label = 'Видео',
}: AudioInputProps) {
    const { stream } = usePage<{
        stream: string;
    }>().props;

    const [preview, setPreview] = useState(stream);
    const id = useId();

    console.log(stream)

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    return (
        <div>
            <p className="mb-2 text-center font-semibold sm:text-lg md:text-left">
                {label}
            </p>
            <div className="flex max-w-150 flex-col flex-wrap items-center justify-start gap-10 md:flex-row">
                {isEdited && (
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFile}
                        className="mt-1 hidden"
                        id={id}
                        name={`audio-input-${id}`}
                    />
                )}

                <div className="mt-2 shrink-0 space-y-4">
                    <UploadFileBtn
                        id={id}
                        disabled={!isEdited}
                        label="Загрузить аудиофайл"
                    />
                    <div className="relative flex max-w-120 items-center justify-center duration-200">
                        {preview ? (
                            <HlsPlayer
                                src={preview}
                                className="h-full w-full rounded object-cover"
                            />
                        ) : (
                            <span>Нет аудио</span>
                        )}
                    </div>
                    {error && (
                        <span className="mt-1 block max-w-120 text-sm font-medium text-red-500">
                            {error}
                        </span>
                    )}
                </div>

                <LoadingRing
                    progress={progress}
                    updated={preview !== stream}
                />
            </div>
        </div>
    );
}
