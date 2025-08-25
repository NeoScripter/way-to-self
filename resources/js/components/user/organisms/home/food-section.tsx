import { foodCardData } from '@/lib/data/card-data';
import { Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';
import ContentCard from '../../atoms/content-card';
import InfoCard from '../../atoms/info-card';
import SecondaryHeading from '../../atoms/secondary-heading';
import SpanHighlight from '../../atoms/span-highlight';

export default function FoodSection() {
    const { recipes } = usePage<{ recipes: Recipe[] }>().props;

    return (
        <>
            <h3
                id="nutrition-section-title"
                className="relative z-11 mb-11 xl:mb-14"
            >
                <SpanHighlight
                    text='Раздел "Питание"'
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[8rem]"
                />
            </h3>

            <p className="relative z-11 mx-auto mb-17 block text-center text-sm font-semibold sm:text-base lg:max-w-3/4 2xl:text-xl">
                Питание — это не про ограничения. Это про поддержку, энергию и
                уважение к себе. В этом разделе вы найдете рецепты, которые не
                требуют часов у плиты, рекомендации, которые легко встроить в
                реальную жизнь, и главное — подход без вины и диет. Здесь нет
                запретов, подсчёта калорий и жёстких рамок. Только осознанный
                выбор, гибкость и возможность слушать своё тело, а не следовать
                чужим правилам. Раздел постоянно пополняется.
            </p>

            <ul
                className="relative z-11 mb-17 grid gap-11 sm:grid-cols-2 xl:grid-cols-4"
                role="list"
            >
                {foodCardData.map((card) => (
                    <InfoCard
                        html={card.text}
                        key={card.id}
                        img={card.img}
                        alt={card.alt}
                    />
                ))}
            </ul>

            <SecondaryHeading
                text="Примеры рецептов"
                className="mb-17"
            />

            <ul
                className="relative z-11 mb-17 grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] gap-11 md:mx-auto md:max-w-200 2xl:max-w-full"
                role="list"
            >
                {recipes.map((recipe) => (
                    <ContentCard
                        key={recipe.id}
                        type="recipe"
                        className="mx-auto"
                        data={{
                            href: route('user.recipes.show', recipe),
                            name: recipe.title,
                            img: recipe.image?.path,
                            alt: recipe.image?.alt,
                            tinyImg: recipe.image?.tiny_path,
                            description: recipe.description,
                            duration: recipe.duration,
                            rating: recipe.rating,
                            category: recipe.category?.name,
                        }}
                    />
                ))}
            </ul>
        </>
    );
}
