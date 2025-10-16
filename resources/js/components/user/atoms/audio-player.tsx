import PlayBtn from '@/assets/svgs/play.svg';
import PauseBtn from '@/assets/svgs/pаuse.svg';
import { convertSecondsToTime } from '@/lib/helpers/convertSecondsToTime';
import { cn } from '@/lib/utils';
import type { Audio } from '@/types/model';
import { usePage } from '@inertiajs/react';
import Hls from 'hls.js';
import { Volume1, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import LazyImage from './lazy-image';

type AudioPlayerProps = {
    className?: string;
    showTitle?: boolean;
};

export default function AudioPlayer({
    className,
    showTitle = true,
}: AudioPlayerProps) {
    const { audio, stream } = usePage<{ audio: Audio; stream: string }>().props;
    const src = stream;

    if (stream == null) return null;

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        let hls: Hls | null = null;

        if (Hls.isSupported() && src != null && src.endsWith('stream')) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(audio);
        } else {
            audio.src = src;
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [src]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setProgress(audio.currentTime);
        const setMeta = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setMeta);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setMeta);
        };
    }, []);

    const handlePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        setIsPlaying(false);
    };

    const handleSeek = (value: string) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Number(value);
        setProgress(Number(value));
    };

    const handleVolume = (step: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        const normalizedStep = step / 100;

        let newVolume = audio.volume + normalizedStep;

        newVolume = Math.min(1, Math.max(0, newVolume));

        audio.volume = newVolume;
        setVolume(newVolume);
    };

    return (
        <div
            className={cn(
                'relative rounded-[3.5rem] border-2 border-white/20 bg-card-backdrop-gray/50 p-8 text-white backdrop-blur-sm sm:mt-44 sm:rounded-[6rem] sm:px-17 sm:pt-50 sm:pb-14 lg:mt-0 lg:pt-14 lg:pb-14 3xl:pr-33 3xl:pl-46',
                className,
            )}
        >
            <div className="text-center lg:flex lg:items-start lg:justify-between lg:gap-16 lg:text-left">
                {audio.image && (
                    <LazyImage
                        img={audio.image.path}
                        tinyImg={audio.image.tiny_path}
                        alt={audio.image.alt}
                        parentClass="rounded-xl overflow-clip mx-auto mb-5 sm:mb-6 max-w-60 sm:size-75 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0 sm:-translate-y-2/5 sm:max-w-full lg:static lg:translate-0 lg:mx-0 lg:shrink-0 lg:size-75 lg:basis-75 lg:self-center"
                    />
                )}

                <div className={cn(!showTitle && 'pt-10')}>
                    {showTitle && (
                        <p className="mb-3 text-xl sm:mb-4 sm:text-2xl lg:mb-5 lg:text-3xl">
                            {audio.title}
                        </p>
                    )}
                    <p className="mb-6 text-sm sm:text-base md:text-lg lg:mb-8">
                        {audio.description}
                    </p>

                    <div className="mx-auto max-w-75 sm:max-w-100 lg:ml-0">
                        {/* Progress bar */}
                        <div className="mt-4 flex items-center gap-1">
                            <div className="w-12 text-xs">
                                {convertSecondsToTime(progress)}
                            </div>
                            <input
                                type="range"
                                value={progress}
                                step="1"
                                min="0"
                                max={duration || 0}
                                className="audio-track"
                                onChange={(e) => handleSeek(e.target.value)}
                            />
                            <div className="w-12 text-end text-xs">
                                {!isNaN(duration) &&
                                    convertSecondsToTime(duration)}
                            </div>
                        </div>

                        {/* Hidden audio */}
                        <audio
                            ref={audioRef}
                            className="hidden"
                        />

                        {/* Controls */}
                        <div className="mx-auto mt-5 flex items-center justify-center gap-6">
                            <SvgBtn
                                ariaLabel="Уменьшить звук"
                                event={() => handleVolume(-10)}
                            >
                                <Volume1 className="size-full text-white" />
                            </SvgBtn>
                            {isPlaying ? (
                                <PlayerBtn
                                    alt="Pause"
                                    image={PauseBtn}
                                    ariaLabel="pause"
                                    event={handlePause}
                                />
                            ) : (
                                <PlayerBtn
                                    alt="Play"
                                    image={PlayBtn}
                                    ariaLabel="play"
                                    event={handlePlay}
                                />
                            )}
                            <SvgBtn
                                ariaLabel="Усилить звук"
                                event={() => handleVolume(10)}
                            >
                                <Volume2 className="ml-2 size-full text-white" />
                            </SvgBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type PlayerBtnProps = {
    alt: string;
    event: () => void;
    image: string;
    ariaLabel: string;
    className?: string;
};

function PlayerBtn({
    alt,
    event,
    image,
    ariaLabel,
    className,
}: PlayerBtnProps) {
    return (
        <button
            type="button"
            className={cn('size-14 cursor-pointer', className)}
            aria-label={ariaLabel}
            onClick={event}
        >
            <img
                src={image}
                alt={alt}
                className="transition-scale size-full object-contain object-center duration-150 ease-in hover:scale-110"
            />
        </button>
    );
}

type SvgBtnProps = {
    event: () => void;
    ariaLabel: string;
    className?: string;
    children: React.ReactNode;
};
function SvgBtn({ event, children, ariaLabel, className }: SvgBtnProps) {
    return (
        <button
            type="button"
            className={cn(
                'transition-scale size-10 cursor-pointer duration-150 ease-in hover:scale-110',
                className,
            )}
            aria-label={ariaLabel}
            onClick={event}
        >
            {' '}
            {children}{' '}
        </button>
    );
}
