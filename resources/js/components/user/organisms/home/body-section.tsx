import SpanHighlight from "../../atoms/span-highlight";
import ExerciseCard1 from "@/assets/images/home/exercise-1.webp";
import ExerciseCard2 from "@/assets/images/home/exercise-2.webp";
import ExerciseCard3 from "@/assets/images/home/exercise-3.webp";
import ExerciseCard4 from "@/assets/images/home/exercise-4.webp";
import InfoCard from "../../atoms/info-card";
import SecondaryHeading from "../../atoms/secondary-heading";
import { bodyCardData } from "@/lib/data/card-data";
import ContentCard from "../../atoms/content-card";

export default function BodySection() {
    return (
        <>
            <h3 id="body-section-title" className="mb-11 xl:mb-14">
                <SpanHighlight
                    text='Раздел "Тело"'
                    className="text-white text-[4rem] sm:text-[8rem] mx-auto mt-[0.1em]"
                />
            </h3>

            <p className="block mb-17 mx-auto text-sm text-center font-semibold sm:text-base lg:max-w-3/4 2xl:text-xl">
                Движение — это способ почувствовать себя живым. Не ради формы, а ради энергии, лёгкости и внутренней опоры. В этом разделе — тренировки и практики, которые помогают телу просыпаться, становиться сильнее, выносливее, гибче. Упражнения подобраны так, чтобы каждый мог заниматься в своём темпе — без перегрузки, но с результатом.
            </p>

            <ul className="mb-17 grid gap-11 sm:grid-cols-2 xl:grid-cols-4" role="list">
                {bodyCardData.map(card => (
                    <InfoCard html={card.text} key={card.id} img={card.img} alt={card.alt} />
                ))}
            </ul>

            <SecondaryHeading text="Примеры упражнений" className="mb-17" />

            <ul
                className="mb-17 grid gap-11 grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] md:max-w-200 md:mx-auto 2xl:max-w-full"
                role="list"
            >
                {exercises.map(exercise => (
                    <ContentCard
                        key={exercise.id}
                        className="mx-auto"
                        type="exercise" data={{
                            name: exercise.name,
                            img: exercise.img,
                            alt: exercise.alt,
                            description: exercise.description,
                            duration: exercise.duration,
                            rating: exercise.rating,
                            category: exercise.category,
                        }} />
                ))}
            </ul>
        </>
    );
}

export type ExerciseData = {
    id: string;
    name: string;
    description: string;
    img: string;
    alt: string;
    duration: number;
    rating: number;
    category: string;
}

const exercises: ExerciseData[] = [
    {
        id: "exercise-breathing-relax",
        name: "Глубокое дыхание",
        description: "Простое упражнение для снижения тревожности и восстановления спокойствия. Подходит для любого времени дня.",
        img: ExerciseCard1,
        alt: "Женщина с закрытыми глазами делает дыхательное упражнение на фоне природы",
        duration: 5,
        rating: 8,
        category: "Расслабление",
    },
    {
        id: "exercise-body-scan",
        name: "Сканирование тела",
        description: "Медленное осознание всех частей тела, чтобы снять напряжение и повысить чувствительность к внутренним состояниям.",
        img: ExerciseCard2,
        alt: "Человек лежит на коврике, расслабленно закрыв глаза, в комнате с мягким светом",
        duration: 15,
        rating: 6,
        category: "Осознанность",
    },
    {
        id: "exercise-stretching-flow",
        name: "Мягкая растяжка",
        description: "Небольшой комплекс для улучшения гибкости и снятия зажатости. Идеален для утреннего пробуждения.",
        img: ExerciseCard3,
        alt: "Женщина делает наклон вперёд на коврике в уютной комнате",
        duration: 10,
        rating: 7,
        category: "Движение",
    },
    {
        id: "exercise-evening-journal",
        name: "Вечерняя рефлексия",
        description: "Короткое письменное упражнение, чтобы отпустить события дня, зафиксировать благодарности и переключиться на отдых.",
        img: ExerciseCard4,
        alt: "Открытый блокнот с ручкой на столе рядом с чашкой чая",
        duration: 8,
        rating: 9,
        category: "Самоанализ",
    }
];




