import { cn } from '@/lib/utils';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
    src: string;
    className?: string;
};

export default function VideoPlayer({ className, src }: VideoPlayerProps) {
    return (
        <div
            className={cn('aspect-video overflow-clip rounded-2xl', className)}
        >
            <ReactPlayer
                src={src}
                controls
                width="100%"
                height="100%"
                onError={(error) => {
                    console.error('ReactPlayer error:', error);
                }}
                playing={false}
                light={false}
                pip={false}
                playsInline={true}
                style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
        </div>
    );
}
