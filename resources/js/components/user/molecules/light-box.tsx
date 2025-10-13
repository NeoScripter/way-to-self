import LazyImage from '@/components/user/atoms/lazy-image';
import DialogLayout from '@/components/user/molecules/dialog-layout';
import { Image } from '@/types/model';

type LightBoxProps = {
    img: Image | null;
    onClose: () => void;
};

export default function LightBox({ img, onClose }: LightBoxProps) {
    if (img == null) return null;

    return (
        <DialogLayout
            show={img != null}
            onClose={onClose}
            className="mx-auto max-w-180 text-black"
        >
            <LazyImage
                parentClass="aspect-video rounded-2xl"
                img={img.path}
                tinyImg={img.tiny_path}
                alt={img.alt}
            />
        </DialogLayout>
    );
}
