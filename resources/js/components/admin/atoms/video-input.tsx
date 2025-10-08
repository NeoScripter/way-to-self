import Placeholder from '@/assets/images/shared/placeholder.webp';
import VideoPlayer from '@/components/user/molecules/video-player';
import { cn } from '@/lib/utils';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import type { AxiosProgressEvent } from 'axios';
import { Check } from 'lucide-react';
import React, { useId, useState } from 'react';

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

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onChange(file);
    };

    const showCheckMark =
        progress &&
        progress.percentage &&
        progress.percentage > 98 &&
        preview !== video;
    const showLoadingRing =
        progress &&
        progress.percentage &&
        progress.percentage < 98 &&
        preview !== video;

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
                    <label
                        htmlFor={id}
                        className={cn(
                            'flex h-fit cursor-pointer items-center gap-2 rounded-md bg-slate-800 px-6 py-3 text-sm text-white transition-opacity duration-200 focus-within:opacity-90 hover:opacity-90',
                            !isEdited && 'cursor-not-allowed opacity-50',
                        )}
                    >
                        <ArrowDownTrayIcon className="size-5" />
                        Загрузить видео
                    </label>
                </div>
                <div>
                    <div
                        onClick={() => setShowPopup(true)}
                        className="relative flex max-w-120 cursor-pointer items-center justify-center duration-200"
                    >
                        <VideoPlayer
                            src={preview || Placeholder}
                            className="h-full w-full rounded object-cover"
                        />
                    </div>
                    {error && (
                        <span className="block max-w-35 text-sm text-red-500">
                            {error}
                        </span>
                    )}
                </div>

                {showCheckMark ||
                    (showLoadingRing && (
                        <div className="relative mx-auto flex aspect-square size-20 flex-wrap place-content-center text-xs font-bold">
                            {showLoadingRing && <LoadingRing />}

                            {showLoadingRing && (
                                <span>{`${progress.percentage}%`}</span>
                            )}

                            {showCheckMark && (
                                <div className="flex size-8 animate-fade flex-wrap place-content-center rounded-full bg-bright-salad">
                                    <Check className="text-white" />
                                </div>
                            )}
                        </div>
                    ))}
            </div>
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
