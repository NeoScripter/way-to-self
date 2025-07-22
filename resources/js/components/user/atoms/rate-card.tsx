import { cn } from "@/lib/utils";

type RateCardProps = {
    image: string;
    alt: string;
    title: string;
    description: string;
    className?: string;
    price: number;
}

export default function RateCard({ image, title, description, alt, className, price }: RateCardProps) {
    return (
        <li
            className={cn("border-white/20 backdrop-blur-sm bg-card-backdrop-gray/50 mx-auto text-white rounded-[3rem] p-6.5 relative pt-26 px-7 pb-10 sm:px-9 sm:pt-35 sm:max-w-97 sm:rounded-[6rem] xl:max-w-full xl:px-10 xl:pb-9 xl:pt-34", className)}
            role="article"
            aria-label="Карточка с тарифом"
        >
            <div className="overflow-clip rounded-full size-42 sm:size-53.5 absolute top-0 left-1/2 -translate-1/2">
                <img
                    src={image}
                    alt={alt}
                    className="size-full object-center object-cover"
                />
            </div>

            <h4 className="text-center font-heading text-3xl mb-4 sm:mb-6 sm:text-5xl">{title}</h4>

            <p className="text-center text-balance text-sm mb-4 sm:mb-6 sm:text-base 2xl:text-xl">{description}</p>

            <p className="text-center font-heading text-balance text-3xl sm:text-5xl">{`${price}р`}</p>
        </li>

    )
}
