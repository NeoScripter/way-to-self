import { bodyCardData } from '@/lib/data/card-data';
import { Exercise } from '@/types/model';
import { usePage } from '@inertiajs/react';
import SpanHighlight from '../atoms/span-highlight';
import InfoCard from '../atoms/info-card';
import SecondaryHeading from '../atoms/secondary-heading';
import ContentCard from '../atoms/content-card';

export default function BodySection() {
    const { exercises } = usePage<{ exercises: Exercise[] }>().props;

    return (
        <>
            <h3
                id="body-section-title"
                className="mb-11 xl:mb-14"
            >
                <SpanHighlight
                    text='Раздел "Тело"'
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[8rem]"
                />
            </h3>

            <p className="relative z-11 mx-auto mb-17 block text-center text-sm font-semibold sm:text-base lg:max-w-3/4 2xl:text-xl">
                Движение — это способ почувствовать себя живым. Не ради формы, а
                ради энергии, лёгкости и внутренней опоры. В этом разделе —
                тренировки и практики, которые помогают телу просыпаться,
                становиться сильнее, выносливее, гибче. Упражнения подобраны
                так, чтобы каждый мог заниматься в своём темпе — без перегрузки,
                но с результатом.
            </p>

            <ul
                className="relative z-11 mb-17 grid gap-11 sm:grid-cols-2 xl:grid-cols-4"
                role="list"
            >
                {bodyCardData.map((card) => (
                    <InfoCard
                        html={card.text}
                        key={card.id}
                        img={card.img}
                        alt={card.alt}
                    />
                ))}
            </ul>

            <SecondaryHeading
                text="Примеры упражнений"
                className="relative z-11 mb-17"
            />

            <ul
                className="relative z-11 mb-17 grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] gap-11 md:mx-auto md:max-w-200 2xl:max-w-full"
                role="list"
            >
                {exercises.map((exercise) => (
                    <ContentCard
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
                            rating: exercise.rating,
                            category: exercise.category?.name,
                        }}
                    />
                ))}
            </ul>
        </>
    );
}
