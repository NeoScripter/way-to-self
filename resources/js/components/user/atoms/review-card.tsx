import { cn } from "@/lib/utils";
import Quotes from "@/assets/svgs/quotes.svg";
import LazyImage from "./lazy-image";
import { Image } from "@/types/model";

type ReviewCardProps = {
    id: number;
    img: Image | undefined;
    review: string;
    author: string;
    className?: string;
}

export default function ReviewCard({ img, review, author, className }: ReviewCardProps) {

    return (
        <li className={cn("border-white/20 backdrop-blur-sm bg-white/50 shrink-0 w-75 pt-7 px-7 pb-10 flex flex-col gap-3 items-center rounded-3xl sm:gap-5 md:items-start md:flex-row md:w-168 md:gap-7 lg:px-12 lg:py-6 lg:w-241 2xl:w-292.5 2xl:px-8", className)}>

            {img && <LazyImage parentClass="shrink-0 rounded-3xl overflow-clip size-25 sm:size-52 lg:size-73.5" img={img} />}

            <div className="text-xs sm:text-sm lg:text-base md:my-3 lg:my-6">
                <p className="mb-4.5 2xl:text-xl">{review}</p>
                <p className="font-bold text-black">{author}</p>
            </div>

            <div className="hidden md:block md:shrink-0">
                <img src={Quotes} alt="" aria-hidden="true" className="w-9 object-contain object-center" />
            </div>
        </li>
    )
}
