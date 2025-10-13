import { RecipeInfo as RecipeInfoType } from '@/types/model';
import { ZoomIn } from 'lucide-react';
import LazyImage from '../atoms/lazy-image';

type RecipeInfoProps = {
    info: RecipeInfoType;
    onClick: () => void;
};

export default function RecipeInfo({ info, onClick }: RecipeInfoProps) {
    return (
        <div className="relative rounded-3xl bg-white px-4 py-6 text-sm text-text-black md:px-6 md:py-7 md:text-base lg:text-sm xl:text-base">
            <h3 className="mb-3 text-xl font-bold tracking-wider text-bright-salad uppercase md:text-2xl lg:text-xl xl:text-2xl">
                {info.title}
            </h3>

            {info.html && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: info.html,
                    }}
                ></div>
            )}

            {info.image && (
                <>
                    <LazyImage
                        parentClass="aspect-video rounded-2xl"
                        img={info.image.path}
                        tinyImg={info.image.tiny_path}
                        alt={info.image.alt}
                    />
                    <button
                        onClick={onClick}
                        className="absolute right-2 bottom-2 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full bg-bright-salad sm:top-5 sm:right-5"
                    >
                        <ZoomIn className="size-3/4 text-white" />
                    </button>
                </>
            )}
        </div>
    );
}
