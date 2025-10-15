import BerryLeaves from '@/assets/images/home/veggies/berry-leaves.webp';
import CutChili from '@/assets/images/home/veggies/cut-chilli.webp';
import Tomatoes from '@/assets/images/home/veggies/tomatoes.webp';
import ArtLayer from '@/components/user/atoms/art-layer';
import ItemsGrid from '@/layouts/user/items-grid';
import { foodCardData } from '@/lib/data/card-data';
import { Recipe } from '@/types/model';
import { usePage } from '@inertiajs/react';
import ItemCard from '../atoms/item-card';
import EntryIntro from './entry-intro';

export default function FoodSection() {
    const { recipes } = usePage<{
        recipes: Recipe[];
    }>().props;

    return (
        <>
            <EntryIntro
                entryKey={'nutrition'}
                cards={foodCardData}
                title='Раздел "Питание"'
                heading="Примеры рецептов"
            />

            <ItemsGrid>
                {recipes.map((recipe) => (
                    <ItemCard
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
                            complexity: recipe.complexity,
                            category: recipe.category?.name,
                        }}
                    />
                ))}
            </ItemsGrid>

            <ArtLayer
                img={CutChili}
                className="top-50 -right-10 z-10 w-3/5 max-w-105 min-w-60 sm:top-10 xl:-top-50 xl:-right-20 2xl:-right-40"
            />
            <ArtLayer
                img={Tomatoes}
                className="right-5 hidden w-100 xl:bottom-40 xl:block"
            />
            <ArtLayer
                img={BerryLeaves}
                className="top-1/4 -right-1/3 w-full max-w-140 sm:top-1/2 lg:top-auto lg:right-auto lg:-bottom-80 lg:-left-20"
            />
        </>
    );
}
