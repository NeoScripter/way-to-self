import Placeholder from '@/assets/images/admin/video-placeholder.webp';
import VideoPlayer from '@/components/user/molecules/video-player';
import { usePage } from '@inertiajs/react';
import type { AxiosProgressEvent } from 'axios';
import React, { useEffect, useId, useState } from 'react';
import LoadingRing from './loading-ring';
import UploadFileBtn from './upload-file-btn';

type VideoInputProps = {
    isEdited: boolean;
    onChange: (file: File | null) => void;
    error?: string;
    progress?: AxiosProgressEvent | null;
    label?: string;
};

export default function VideoInput({
    isEdited,
    onChange,
    error,
    progress,
    label = 'Видео',
}: VideoInputProps) {
    const { video } = usePage<{
        video: string | undefined;
    }>().props;

    const [preview, setPreview] = useState(video);
    const id = useId();

    useEffect(() => {
        const resetImage = () => setPreview(video);

        document.addEventListener('media:clear', resetImage);
        return () => document.removeEventListener('media:clear', resetImage);
    }, [video]);

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
            <div className="flex flex-col flex-wrap items-center justify-start gap-10 md:flex-row">
                {isEdited && (
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFile}
                        className="mt-1 hidden"
                        id={id}
                        name={`video-input-${id}`}
                    />
                )}

                <div className="shrink-0">
                    <UploadFileBtn
                        id={id}
                        disabled={!isEdited}
                        label="Загрузить видео"
                    />
                </div>
                <div>
                    <div className="relative flex max-w-120 items-center justify-center duration-200">
                        {preview ? (
                            <VideoPlayer
                                src={preview}
                                className="h-full w-full rounded object-cover"
                            />
                        ) : (
                            <img
                                src={Placeholder}
                                alt="Нет видео"
                            />
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
                    updated={preview !== video}
                />
            </div>
        </div>
    );
}
