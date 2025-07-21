import SpanHighlight from "../../atoms/span-highlight";
import RecipeCard1 from "@/assets/images/home/recipe-1.webp";
import RecipeCard2 from "@/assets/images/home/recipe-2.webp";
import RecipeCard3 from "@/assets/images/home/recipe-3.webp";
import RecipeCard4 from "@/assets/images/home/recipe-4.webp";
import InfoCard from "../../atoms/info-card";
import SecondaryHeading from "../../atoms/secondary-heading";
import RecipeCard from "../../atoms/recipe-card";
import { foodCardData } from "@/lib/data/card-data";

export default function FoodSection() {
    return (
        <>
            <h3 id="nutrition-section-title" className="mb-11 xl:mb-14">
                <SpanHighlight
                    text='Раздел &quot;Питание&quot;'
                    className="text-white text-[4rem] sm:text-[8rem] mx-auto mt-[0.1em]"
                />
            </h3>

            <p className="block mb-17 mx-auto text-sm text-center font-semibold sm:text-base lg:max-w-3/4 2xl:text-xl">
                Питание — это не про ограничения. Это про поддержку, энергию и уважение к себе. В этом разделе вы найдете рецепты, которые не требуют часов у плиты, рекомендации, которые легко встроить в реальную жизнь, и главное — подход без вины и диет. Здесь нет запретов, подсчёта калорий и жёстких рамок. Только осознанный выбор, гибкость и возможность слушать своё тело, а не следовать чужим правилам. Раздел постоянно пополняется.
            </p>

            <ul className="mb-17 grid gap-11 sm:grid-cols-2 xl:grid-cols-4" role="list">
                {foodCardData.map(card => (
                    <InfoCard html={card.text} key={card.id} img={card.img} alt={card.alt}/>
                ))}
            </ul>

            <SecondaryHeading text="Примеры рецептов" className="mb-17" />

            <ul className="mb-17 grid gap-11 grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] md:max-w-200 md:mx-auto 2xl:max-w-full" role="list">
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} className="mx-auto" />
                ))}
            </ul>
        </>
    );
}

export type RecipeData = {
    id: string;
    name: string;
    description: string;
    img: string;
    alt: string;
    prepTime: number;
    rating: number;
    category: string;
}

const recipes: RecipeData[] = [
    {
        id: "recipe-overnight-oats",
        name: "Овсянка на ночь с ягодами",
        description: "Питательный завтрак без готовки — просто смешайте ингредиенты вечером и наслаждайтесь утром.",
        img: RecipeCard1,
        alt: "Банка с овсянкой на ночь, украшенная черникой, малиной и мятой",
        prepTime: 5,
        rating: 8,
        category: "Завтрак",
    },
    {
        id: "recipe-quinoa-salad",
        name: "Салат с киноа и овощами",
        description: "Лёгкий и насыщенный салат с киноа, свежими овощами и заправкой из оливкового масла и лимона.",
        img: RecipeCard2,
        alt: "Салат из киноа с огурцом, помидорами черри и зеленью в белой миске",
        prepTime: 15,
        rating: 6,
        category: "Обед",
    },
    {
        id: "recipe-chickpea-curry",
        name: "Карри из нута",
        description: "Пряное и сытное блюдо на растительной основе, отлично сочетается с рисом или лепёшками.",
        img: RecipeCard3,
        alt: "Тарелка с нутовым карри, рисом и зеленью",
        prepTime: 25,
        rating: 4,
        category: "Ужин",
    },
    {
        id: "recipe-avocado-toast",
        name: "Тост с авокадо и яйцом",
        description: "Быстрый и вкусный перекус с хрустящим хлебом, спелым авокадо и варёным яйцом.",
        img: RecipeCard4,
        alt: "Тост с размятым авокадо и половинкой варёного яйца, посыпанный кунжутом",
        prepTime: 10,
        rating: 7,
        category: "Перекус",
    }
];


