import "../../../../css/info-card.css";

type InfoCardProps = {
    img: string;
    alt: string;
    children: React.ReactNode;
}

export default function InfoCard({ img, alt, children }: InfoCardProps) {
    return (
        <li
            className="bg-white/33 w-66 h-105 p-6 pt-15 rounded-[9.3rem] rounded-tl-[1.25rem] mx-auto flex flex-col justify-between info-card__shadow"
            role="listitem"
        >
            <div className="text-sm font-semibold" aria-label="Описание карточки">
                {children}
            </div>

            <figure className="aspect-square rounded-full overflow-clip w-full">
                <img src={img} alt={alt} className="size-full object-center object-cover" />
            </figure>
        </li>)
}
