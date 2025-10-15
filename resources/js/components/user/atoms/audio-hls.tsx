import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

type AudioHlsProps = {
    src: string; // could be HLS (.m3u8) or direct file (.mp3, .aac)
};

export default function AudioHls({ src }: AudioHlsProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (Hls.isSupported() && src.endsWith('stream')) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(audio);

            return () => {
                hls.destroy();
            };
        } else {
            audio.src = src;
        }
    }, [src]);

    return (
        <audio
            ref={audioRef}
            controls
            className="mx-auto w-100"
        />
    );
}
