import NextBtn from '@/assets/svgs/next.svg';
import PlayBtn from '@/assets/svgs/play.svg';
import PauseBtn from '@/assets/svgs/pаuse.svg';
import { convertSecondsToTime } from '@/lib/helpers/convertSecondsToTime';
import { cn } from '@/lib/utils';
import type { Audio } from '@/types/model';
import { useRef, useState } from 'react';
import LazyImage from './lazy-image';

type AudioPlayerProps = {
    tracks: Audio[];
    className?: string;
};

export default function AudioPlayer({ className, tracks }: AudioPlayerProps) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [order, setOrder] = useState<'default' | 'random' | 'repeat'>(
        'default',
    );

    const { title, description, image, path } = tracks[trackIndex];
    const audioRef = useRef<HTMLAudioElement>(new Audio(path));
    const intervalRef = useRef<number | null>(null);
    const { duration } = audioRef.current;

    const togglePlaybackOrder = (
        selectedOrder: 'default' | 'random' | 'repeat',
    ) => {
        setOrder((prevOrder) =>
            prevOrder === selectedOrder ? 'default' : selectedOrder,
        );
    };

    const startTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    };

    const onScrub = (value: number | string) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        audioRef.current.currentTime = Number(value);
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        if (!isPlaying) setIsPlaying(true);
        startTimer();
    };

    const toPrevTrack = () => {
        if (order === 'repeat') {
            onScrub(0);
        } else if (order === 'random') {
            const length = tracks.length;
            setTrackIndex((prev) => {
                let next;
                do {
                    next = Math.floor(Math.random() * length);
                } while (next === prev);
                return next;
            });
        } else {
            setTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
        }

        switchTrack();
        handlePlayClick();
    };

    const toNextTrack = () => {
        if (order === 'repeat') {
            onScrub(0);
        } else if (order === 'random') {
            const length = tracks.length;
            setTrackIndex((prev) => {
                let next;
                do {
                    next = Math.floor(Math.random() * length);
                } while (next === prev);
                return next;
            });
        } else {
            setTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
        }

        switchTrack();
        handlePlayClick();
    };

    function switchTrack() {
        audioRef.current.pause();
        audioRef.current = new Audio(path);
        setTrackProgress(audioRef.current.currentTime);
    }

    function handlePlayClick() {
        audioRef.current.play();
        startTimer();
        setIsPlaying(true);
    }

    function handlePauseClick() {
        audioRef.current.pause();
        setIsPlaying(false);
    }

    return (
        <div
            className={cn(
                'relative rounded-[3.5rem] border-2 border-white/20 bg-card-backdrop-gray/50 p-8 text-white backdrop-blur-sm sm:mt-44 sm:rounded-[6rem] sm:px-17 sm:pt-50 sm:pb-14 lg:mt-0 lg:pt-14 lg:pb-14 3xl:pr-33 3xl:pl-46',
                className,
            )}
        >
            <div className="text-center lg:flex lg:items-start lg:justify-between lg:gap-16 lg:text-left">
                {tracks[trackIndex].image && (
                    <LazyImage
                        img={tracks[trackIndex].image.path}
                        tinyImg={tracks[trackIndex].image.tiny_path}
                        alt={tracks[trackIndex].image.alt}
                        parentClass="rounded-xl overflow-clip mx-auto mb-5 sm:mb-6 max-w-60 sm:size-75 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0 sm:-translate-y-2/5 sm:max-w-full lg:static lg:translate-0 lg:mx-0 lg:shrink-0 lg:size-75 lg:basis-75 lg:self-center"
                    />
                )}

                <div>
                    <p className="mb-3 text-xl sm:mb-4 sm:text-2xl lg:mb-5 lg:text-3xl">
                        {title}
                    </p>
                    <p className="mb-6 text-sm sm:text-base lg:mb-8">
                        {description}
                    </p>

                    <div className="mx-auto max-w-75 sm:max-w-100 lg:ml-0">
                        <div className="mt-4 flex items-center gap-1">
                            <div className="w-12 text-xs">
                                {convertSecondsToTime(trackProgress)}
                            </div>
                            <input
                                type="range"
                                value={trackProgress}
                                step="1"
                                min="0"
                                max={duration || 0}
                                className="audio-track"
                                onChange={(e) => onScrub(e.target.value)}
                                onMouseUp={onScrubEnd}
                                onKeyUp={onScrubEnd}
                            />
                            <div className="w-12 text-end text-xs">
                                {!isNaN(duration) &&
                                    convertSecondsToTime(duration)}
                            </div>
                        </div>
                        <AudioControls
                            togglePlaybackOrder={togglePlaybackOrder}
                            order={order}
                            isPlaying={isPlaying}
                            onPrevClick={toPrevTrack}
                            onNextClick={toNextTrack}
                            onPlayClick={handlePlayClick}
                            onPauseClick={handlePauseClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

type AudioControlsProps = {
    isPlaying: boolean;
    onPrevClick: () => void;
    onNextClick: () => void;
    onPlayClick: () => void;
    onPauseClick: () => void;
    order: 'default' | 'random' | 'repeat';
    togglePlaybackOrder: (
        selectedOrder: 'default' | 'random' | 'repeat',
    ) => void;
};

function AudioControls({
    isPlaying,
    onPrevClick,
    onNextClick,
    onPlayClick,
    onPauseClick,
    order,
    togglePlaybackOrder,
}: AudioControlsProps) {
    return (
        <div className="mx-auto mt-5 flex max-w-4/5 items-center justify-between text-white">
            <SvgBtn
                ariaLabel="Повторить трэк"
                event={() => togglePlaybackOrder('repeat')}
                className={cn(
                    order === 'repeat'
                        ? 'text-very-bright-salad'
                        : 'text-white',
                )}
            >
                <svg
                    id="OBJECTS"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="currentColor"
                        d="M29,49.93A11.33,11.33,0,0,1,40.31,38.61h2.81v4.94L53.91,36.1,43.12,28.66v5.72H40.31a15.55,15.55,0,1,0,0,31.09H44V61.23H40.31A11.32,11.32,0,0,1,29,49.93Z"
                    />
                    <path
                        fill="currentColor"
                        d="M73.63,50.07A11.33,11.33,0,0,1,62.32,61.39H59.51V56.45L48.71,63.9l10.8,7.44V65.62h2.81a15.55,15.55,0,0,0,0-31.09H58.65v4.24h3.67A11.32,11.32,0,0,1,73.63,50.07Z"
                    />
                </svg>
            </SvgBtn>

            <PlayerBtn
                alt="Предыдущий трэк"
                image={NextBtn}
                ariaLabel="предыдущий трэк"
                event={onPrevClick}
                className="rotate-180"
            />
            {isPlaying ? (
                <PlayerBtn
                    alt="Поставить на паузу"
                    image={PauseBtn}
                    ariaLabel="пауза"
                    event={onPauseClick}
                />
            ) : (
                <PlayerBtn
                    alt="Воспроизвести"
                    image={PlayBtn}
                    ariaLabel="воспроизведение"
                    event={onPlayClick}
                />
            )}
            <PlayerBtn
                alt="Следующий трэк"
                image={NextBtn}
                ariaLabel="следующий трэк"
                event={onNextClick}
            />
            <SvgBtn
                ariaLabel="Перемешать"
                event={() => togglePlaybackOrder('random')}
                className={cn(
                    order === 'random'
                        ? 'text-very-bright-salad'
                        : 'text-white',
                )}
            >
                <svg
                    id="OBJECTS"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="currentColor"
                        d="M76.46,63.7,65.38,56.05v5.46H63.75A11.25,11.25,0,0,1,52.52,50.27,15.51,15.51,0,0,0,37,34.78H21.15V39H37A11.25,11.25,0,0,1,48.27,50.27,15.5,15.5,0,0,0,63.75,65.76h1.59v.51h0v5.07Z"
                    />
                    <path
                        fill="currentColor"
                        d="M46.19,56.22A11.22,11.22,0,0,1,37,61H21.15v4.25H37a15.45,15.45,0,0,0,11.19-4.81A18,18,0,0,1,46.19,56.22Z"
                    />
                    <path
                        fill="currentColor"
                        d="M54.34,43.61a11.22,11.22,0,0,1,9.41-5.12h1.63V44L76.46,36.3,65.38,28.66v5.07h0v.51H63.75a15.43,15.43,0,0,0-11.61,5.28A18.1,18.1,0,0,1,54.34,43.61Z"
                    />
                </svg>
            </SvgBtn>
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
                'transition-scale size-14 cursor-pointer duration-150 ease-in hover:scale-110',
                className,
            )}
            aria-label={ariaLabel}
            onClick={event}
        >
            {children}
        </button>
    );
}
