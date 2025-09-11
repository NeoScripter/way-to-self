import LazyImage from './lazy-image';

type InfoCardProps = {
    img: string;
    tinyImg: string;
    alt: string;
    html: string;
};

export default function InfoCard({ img, tinyImg, alt, html }: InfoCardProps) {
    return (
        <li
            className="info-card__shadow mx-auto flex h-105 w-66 flex-col justify-between rounded-[9.3rem] rounded-tl-[1.25rem] bg-white/33 p-6 pt-15"
            role="listitem"
        >
            <div
                className="text-sm font-semibold"
                aria-label="Описание карточки"
                dangerouslySetInnerHTML={{ __html: html }}
            />

            <LazyImage
                img={img}
                tinyImg={tinyImg}
                alt={alt}
                parentClass="aspect-square w-full overflow-clip rounded-full"
                imgClass="size-full object-center object-cover"
            />
        </li>
    );
}
