import Avocado from '@/assets/images/home/veggies/avocado.webp';
import BottomRadish from '@/assets/images/home/veggies/bottom-radish.webp';
import MiddleRadish from '@/assets/images/home/veggies/middle-radish.webp';
import RightRadish from '@/assets/images/home/veggies/right-radish.webp';
import ItemsGrid from '@/layouts/user/items-grid';
import { bodyCardData } from '@/lib/data/card-data';
import { Exercise } from '@/types/model';
import { usePage } from '@inertiajs/react';
import ArtLayer from '../atoms/art-layer';
import ItemCard from '../atoms/item-card';
import EntryIntro from './entry-intro';

export default function BodySection() {
    const { exercises } = usePage<{
        exercises: Exercise[];
    }>().props;

    return (
        <>
            <EntryIntro
                entryKey={'body'}
                cards={bodyCardData}
                title='Раздел "Тело"'
                heading="Примеры упражнений"
            />

            <ItemsGrid>
                {exercises.map((exercise) => (
                    <ItemCard
                        key={exercise.id}
                        type="exercise"
                        className="mx-auto"
                        data={{
                            href: route('user.exercises.show', exercise),
                            name: exercise.title,
                            img: exercise.image?.path,
                            alt: exercise.image?.alt,
                            tinyImg: exercise.image?.tiny_path,
                            description: exercise.description,
                            duration: exercise.duration,
                            complexity: exercise.complexity,
                            category: exercise.category?.name,
                        }}
                    />
                ))}
            </ItemsGrid>

            <ArtLayer
                img={Avocado}
                className="bottom-1/4 left-3/5 w-5/3 max-w-220 -translate-x-1/2 md:bottom-60 md:w-full 2xl:-bottom-50"
            />
            <ArtLayer
                img={RightRadish}
                className="top-1/4 -right-20 w-75 md:hidden xl:top-2/5 xl:-right-40 xl:block"
            />
            <ArtLayer
                img={MiddleRadish}
                className="top-1/4 right-30 w-50 md:hidden xl:top-2/5 xl:right-10 xl:block"
            />
            <ArtLayer
                img={BottomRadish}
                className="top-1/4 right-30 hidden w-50 xl:top-3/5 xl:right-10 xl:block 2xl:top-4/5"
            />
        </>
    );
}
