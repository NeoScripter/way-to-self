import DishSvg from '@/assets/svgs/dish-black.svg';
import ClockSvg from '@/assets/svgs/time-black.svg';
import { roundDuration } from '@/lib/helpers/roundDuration';
import { Recipe as RecipeType } from '@/types/model';
import { AcademicCapIcon } from '@heroicons/react/24/solid';

type RecipeStatsType = {
    recipe: RecipeType;
};

export default function RecipeStats({ recipe }: RecipeStatsType) {
    const roundedDuration = roundDuration(recipe.duration);
    return (
        <div className="mx-auto my-6 flex max-w-75 items-center justify-between text-sm text-text-black md:my-10 md:max-w-80 md:text-base xl:my-12">
            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`${recipe.duration} минут`}
            >
                <img
                    src={ClockSvg}
                    alt=""
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                <span>{roundedDuration}</span>
            </div>

            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`Оценка: ${recipe.complexity} из 10`}
            >
                <AcademicCapIcon
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                <span>{`${recipe.complexity}/10`}</span>
            </div>

            <div
                className="flex items-center gap-1 md:gap-2"
                aria-label={`Категория: ${recipe.category?.name}`}
            >
                <img
                    src={DishSvg}
                    alt=""
                    className="size-6 md:size-7"
                    aria-hidden="true"
                />
                {recipe.category && <span>{recipe.category.name}</span>}
            </div>
        </div>
    );
}
