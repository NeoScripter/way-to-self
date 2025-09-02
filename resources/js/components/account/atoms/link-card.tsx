import { Link } from '@inertiajs/react';

type LinkCardProps = {
    img: string;
    alt: string;
    html: string;
    route: string;
};

export default function LinkCard({ img, route, alt, html }: LinkCardProps) {
    return (
        <li
            className="relative flex items-end h-67 shrink-0 transition-scale ease-in duration-300 hover:scale-110 w-71 flex-col rounded-[4rem] bg-card-backdrop-gray p-10 pb-12.5"
            role="listitem"
        >
            <Link
                href={route}
                className="absolute inset-0 z-10 cursor-pointer"
                as="button"
                prefetch
            ></Link>
            <div
                className="text-sm font-semibold mt-auto"
                aria-label="Описание карточки"
                dangerouslySetInnerHTML={{ __html: html }}
            />

            <figure className="aspect-square account-card-shadow w-7/10 overflow-clip rounded-full absolute top-5 left-1/2 -translate-1/2">
                <img
                    src={img}
                    alt={alt}
                    className="size-full object-cover object-center"
                />
            </figure>
        </li>
    );
}
