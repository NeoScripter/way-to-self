import { cn } from '@/lib/utils';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

type HlsPlayerProps = {
    src: string;
    className?: string;
};

export function HlsPlayer({ src, className }: HlsPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !src) return;

        if (
            audio.canPlayType('application/vnd.apple.mpegurl') ||
            src.startsWith('blob')
        ) {
            audio.src = src;
        } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(audio);
            return () => hls.destroy();
        }
    }, [src]);

    return (
        <audio
            ref={audioRef}
            controls
            className={cn('w-full', className)}
        />
    );
}
