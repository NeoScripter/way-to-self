import { RecipeData } from "../organisms/home/food-section"
import ClockSvg from "@/assets/svgs/clock.svg";
import StarSvg from "@/assets/svgs/star.svg";
import DishSvg from "@/assets/svgs/dish.svg";
import { cn } from "@/lib/utils";
import { shortenDescription } from "@/lib/helpers/shortenDescription";
import { roundDuration } from "@/lib/helpers/roundDuration";

type RecipeCardProps = {
    recipe: RecipeData;
    className?: string;
}

const MAX_WORDS = 15;

export default function RecipeCard({ recipe, className }: RecipeCardProps) {
    const description = shortenDescription(recipe.description, MAX_WORDS);

    const cookingTime = roundDuration(recipe.prepTime);

    return (
        <li
            className={cn("bg-card-backdrop-gray w-80 h-130 text-white rounded-[3rem] p-6.5", className)}
            role="article"
            aria-label={`Рецепт: ${recipe.name}`}
        >
            <div className="overflow-clip rounded-[2rem] mb-5 h-57">
                <img
                    src={recipe.img}
                    alt={recipe.alt}
                    className="size-full object-center object-cover"
                />
            </div>

            <div className="px-2.5 flex h-54 flex-col justify-between gap-2">
                <h3 className="text-2xl leading-7 text-balance text-white text-center mb-2.5">
                    {recipe.name}
                </h3>

                <p className="flex-1">{description}</p>

                <div className="flex mt-auto items-center justify-between">
                    <div className="flex items-center gap-1" aria-label={`Время приготовления: ${recipe.prepTime} минут`}>
                        <img src={ClockSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{cookingTime}</span>
                    </div>

                    <div className="flex items-center gap-1" aria-label={`Оценка: ${recipe.rating} из 10`}>
                        <img src={StarSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{`${recipe.rating}/10`}</span>
                    </div>

                    <div className="flex items-center gap-1" aria-label={`Категория: ${recipe.category}`}>
                        <img src={DishSvg} alt="" className="size-4.5" aria-hidden="true" />
                        <span className="text-sm">{recipe.category}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}
