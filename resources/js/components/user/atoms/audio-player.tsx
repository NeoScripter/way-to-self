import ExampleTrack from "@/assets/audio/example-meditation.mp3";
import ExamplePreview from "@/assets/images/home/example-meditation.webp";
import ExamplePreview2 from "@/assets/images/home/exercise-1.webp";
import { BackwardIcon, ForwardIcon, PlayPauseIcon } from "@heroicons/react/24/solid";
import { PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "../../../../css/audio-player.css";
type AudioPlayerProps = {};

interface Track {
    title: string;
    description: string;
    audioSrc: string;
    image: string;
}

const tracks: Track[] = [
    {
        title: "Название медитации",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur ",
        audioSrc: ExampleTrack,
        image: ExamplePreview,
    },
    {
        title: "Название 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur ",
        audioSrc: ExampleTrack,
        image: ExamplePreview2,
    },
];

export default function AudioPlayer({ }: AudioPlayerProps) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { title, description, image, audioSrc } = tracks[trackIndex];
    const audioRef = useRef<HTMLAudioElement>(new Audio(audioSrc));
    const intervalRef = useRef<number | null>(null);
    const { duration } = audioRef.current;

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
        setTrackIndex((prev) => (prev - 1 < 0 ? tracks.length - 1 : prev - 1));
        handlePlayClick();
    };

    const toNextTrack = () => {
        setTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
        switchTrack();
        handlePlayClick();
    };

    function switchTrack() {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
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
        <div className="text-white relative bg-card-backdrop-gray p-8 rounded-[3.5rem] sm:rounded-[6rem] sm:px-17 sm:mt-44 sm:pb-14 sm:pt-50 lg:pt-14 lg:pb-14 3xl:pl-46 3xl:pr-33">
            <div className="text-center lg:flex lg:items-start lg:gap-16 lg:justify-between lg:text-left">
                <div className="rounded-xl overflow-clip mx-auto mb-5 sm:mb-6 max-w-60 sm:size-75 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0 sm:-translate-y-2/5 sm:max-w-full lg:static lg:translate-0 lg:mx-0 lg:shrink-0 lg:size-75 lg:basis-75 lg:self-center">
                    <img
                        className="object-cover object-center size-full"
                        src={image}
                        alt=""
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <p className="text-xl mb-3 sm:text-2xl sm:mb-4 lg:mb-5 lg:text-3xl">{title}</p>
                    <p className="text-sm mb-6 sm:text-base lg:mb-8">{description}</p>

                    <div className="max-w-75 sm:max-w-100 mx-auto lg:ml-0">
                        <input
                            type="range"
                            value={trackProgress}
                            step="1"
                            min="0"
                            max={duration || 0}
                            className="mt-4 audio-track"
                            onChange={(e) => onScrub(e.target.value)}
                            onMouseUp={onScrubEnd}
                            onKeyUp={onScrubEnd}
                        />

                        <AudioControls
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
};

function AudioControls({
    isPlaying,
    onPrevClick,
    onNextClick,
    onPlayClick,
    onPauseClick
}: AudioControlsProps) {
    return (
        <div className="flex justify-between items-center my-4 text-white">
            <button
                type="button"
                className="size-10 cursor-pointer"
                aria-label="Previous"
                onClick={onPrevClick}
            >
                <BackwardIcon className="size-full" />
            </button>
            {isPlaying ? (
                <button
                    type="button"
                    className="size-14 cursor-pointer"
                    onClick={onPauseClick}
                    aria-label="Pause"
                >
                    <PlayPauseIcon className="size-full" />
                </button>
            ) : (
                <button
                    type="button"
                    className="size-14 cursor-pointer"
                    onClick={onPlayClick}
                    aria-label="Play"
                >
                    <PlayCircle className="size-full" />
                </button>
            )}
            <button
                type="button"
                className="size-10 cursor-pointer"
                aria-label="Next"
                onClick={onNextClick}
            >
                <ForwardIcon className="size-full" />
            </button>
        </div>
    );
}

