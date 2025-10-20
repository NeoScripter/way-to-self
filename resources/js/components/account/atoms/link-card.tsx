import LazyImage from '@/components/user/atoms/lazy-image';
import { Link } from '@inertiajs/react';

type LinkCardProps = {
    img: string;
    tinyImg: string;
    alt: string;
    html: string;
    route: string;
};

export default function LinkCard({
    img,
    tinyImg,
    route,
    alt,
    html,
}: LinkCardProps) {
    const isAnchor = route.includes('//t.me/');

    return (
        <li
            className="transition-scale relative flex h-67 w-71 shrink-0 flex-col items-center rounded-[4rem] bg-card-backdrop-gray p-10 pb-12.5 duration-300 ease-in hover:scale-110"
            role="listitem"
        >
            {isAnchor ? (
                <a
                    href={route}
                    target="_blank"
                    className="absolute inset-0 z-10 cursor-pointer"
                />
            ) : (
                <Link
                    href={route}
                    className="absolute inset-0 z-10 cursor-pointer"
                    as="button"
                    prefetch
                />
            )}
            <div
                className="mt-auto text-sm font-semibold"
                aria-label="Описание карточки"
                dangerouslySetInnerHTML={{ __html: html }}
            />

            <LazyImage
                img={img}
                tinyImg={tinyImg}
                alt={alt}
                parentClass="account-card-shadow absolute top-5 left-1/2 aspect-square w-7/10 -translate-1/2 overflow-clip rounded-full"
                imgClass="size-full object-center object-cover"
            />
        </li>
    );
}
