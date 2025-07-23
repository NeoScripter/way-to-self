import { v4 as uuidv4 } from "uuid";
import SpanHighlight from "../../atoms/span-highlight";
import Review0 from "@/assets/images/home/user-0.webp";
import Review1 from "@/assets/images/home/user-1.webp";
import Review2 from "@/assets/images/home/user-2.webp";
import Review3 from "@/assets/images/home/user-3.webp";
import Review4 from "@/assets/images/home/user-4.webp";
import Review5 from "@/assets/images/home/user-5.webp";
import ReviewCard from "../../atoms/review-card";
import { useReducer, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { range } from "@/lib/helpers/range";
import { cn } from "@/lib/utils";
import useWindowSize from "@/hooks/use-window-size";
import calculateSlideOffset from "@/lib/helpers/calculateSlideOffset";

type State = {
    currentIdx: number;
};

type Action =
    | { type: "increment"; payload: number }
    | { type: "decrement"; payload: number }
    | { type: "jump"; payload: number };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "increment":
            return {
                currentIdx: state.currentIdx === action.payload ? 0 : state.currentIdx + 1
            };
        case "decrement":
            return {
                currentIdx: state.currentIdx === 0 ? action.payload : state.currentIdx - 1
            };
        case "jump":
            return {
                currentIdx: action.payload
            }
        default:
            return {
                currentIdx: state.currentIdx
            }
    }
}

export default function ReviewsSection() {
    const [state, dispatch] = useReducer(reducer, { currentIdx: 0 });
    const { width: windowSize } = useWindowSize();
    const touchStart = useRef<number | null>(null);

    function handleJumpToSlide(idx: number) {
        dispatch({
            type: "jump",
            payload: idx
        })
    }

    function handleIncrementSlide() {
        dispatch({
            type: "increment",
            payload: reviews.length - 1
        })
    }

    function handleDecrementSlide() {
        dispatch({
            type: "decrement",
            payload: reviews.length - 1
        })
    }

    function handleTouchStart(e: React.TouchEvent) {
        touchStart.current = e.touches[0].clientX;
    }

    function handleTouchEnd(e: React.TouchEvent) {
        if (touchStart.current === null) return;

        const deltaX = e.changedTouches[0].clientX - touchStart.current;

        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                handleDecrementSlide();
            } else {
                handleIncrementSlide();
            }
        }

        touchStart.current = null;
    };


    const offset = calculateSlideOffset(windowSize);

    return (
        <>
            <h3 id="reviews-section-title" className="mb-11 sm:mb-16 xl:mb-20">
                <SpanHighlight
                    text='Отзывы участников'
                    className="text-white text-[4rem] sm:text-[8rem] mx-auto mt-[0.1em]"
                />
            </h3>

            <div className="overflow-hidden mb-11 sm:mb-16 xl:mb-20">
                <ul
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="flex items-start w-max gap-4 sm:gap-6 md:gap-8 xl:gap-10 ml-4 sm:ml-11 2xl:ml-25 3xl:ml-40 transition-transform duration-400 ease-in-out" style={{ transform: `translateX(-${offset * state.currentIdx}px)` }}>
                    {reviews.map(review => (
                        <ReviewCard key={review.id} img={review.img} alt={review.alt} review={review.review} author={review.author} id={review.id} />
                    ))}
                </ul>
            </div>

            <div className="flex items-center justify-center gap-8 md:gap-12">
                <button onClick={handleDecrementSlide} className="group size-8 md:size-10 flex items-center justify-center cursor-pointer shrink-0">
                    <ChevronLeft className="size-full text-bright-salad transition-colors duration-200 ease-in group-hover:text-very-bright-salad" />
                </button>

                <div className="flex items-center justify-between gap-5">
                    {range(0, reviews.length - 1).map(btnIdx => (
                        <button key={`carousel-btn-${btnIdx}`} onClick={() => handleJumpToSlide(btnIdx)} className={cn("rounded-full shrink-0 size-3 md:size-4 cursor-pointer transition-colors duration-200 ease-in hover:bg-very-bright-salad", btnIdx === state.currentIdx ? "bg-bright-salad" : "bg-white")}></button>
                    ))}
                </div>

                <button onClick={handleIncrementSlide} className="group size-8 md:size-10 flex items-center justify-center cursor-pointer shrink-0">
                    <ChevronRight className="size-full text-bright-salad transition-colors duration-200 ease-in group-hover:text-very-bright-salad" />
                </button>

            </div>
        </>
    );
}

type ReviewCardContent = {
    id: string;
    img: string;
    alt: string;
    review: string;
    author: string;
    className?: string;
}

const reviews: ReviewCardContent[] = [
    {
        id: uuidv4(),
        img: Review0,
        alt: "Молодая женщина с распущенными светлыми волосами в зелёном свитере на фоне природы",
        review: `Я сначала оформила доступ только к разделу "Питание", думала — посмотрю, что это вообще. А в итоге уже через неделю взяла все три. Потому что оно как-то всё работает вместе: утром включаю дыхание из "Души", потом лёгкую растяжку из "Тела", а рецепты — это вообще находка, простые и реально вкусные. Мне нравится, что никто не давит, нет ощущения "ты что-то должен", но в то же время появляется желание заботиться о себе. Всё очень бережно, без перегрузки, и при этом ты чувствуешь, что движешься. Спасибо, что сделали такой уютный и честный ресурс`,
        author: "Катя, 32 года"
    },
    {
        id: uuidv4(),
        img: Review1,
        alt: "Мужчина с бородой и очками, в тёмной рубашке на светлом фоне — цифровая иллюстрация",
        review: `Не думал, что платформа окажется такой живой. Всё сделано по-доброму, без "мотивационного насилия". Я начал с дыхания и медитаций, потом постепенно добавил рецепты. Всё подаётся просто, с уважением, и это ценно.`,
        author: "Вася, 41 год"
    },
    {
        id: uuidv4(),
        img: Review2,
        alt: "Иллюстрация молодой женщины с длинными каштановыми волосами и очками в синем кардигане",
        review: `Очень тёплый проект. Заметила, что с первых дней перестала себя ругать — даже если не успеваю всё сделать. Упражнения короткие, но дают ощущение заботы, а практики для души помогли наконец-то высыпаться. Чувствую, как возвращается энергия.`,
        author: "Ольга, 29 лет"
    },
    {
        id: uuidv4(),
        img: Review3,
        alt: "Иллюстрированная девушка с тёмными волосами и ожерельем на сером фоне",
        review: `Для меня стало утренним ритуалом: включить 10-минутную практику и начать день спокойно. Без гонки, без перегруза. Даже физические упражнения — это не про "прокачай себя", а про "почувствуй тело". Такая редкость.`,
        author: "Анна, 35 лет"
    },
    {
        id: uuidv4(),
        img: Review4,
        alt: "Милая женщина с короткими каштановыми волосами и очками, на фоне улицы — полуиллюстрация",
        review: `Очень понравился подход — можно выбрать только один раздел, а потом расширить. Я начал с "Тела", потому что сидячая работа даёт о себе знать. Стало легче двигаться, меньше боли в спине. Сейчас подключаю и "Питание".`,
        author: "Вероника, 38 лет"
    },
    {
        id: uuidv4(),
        img: Review5,
        alt: "Женщина с длинными тёмными волосами и очками в светлой одежде — портрет на нейтральном фоне",
        review: `Я в восторге от рецептов — простые, натуральные, вкусные. Но самое главное — общее настроение платформы. Такое ощущение, что тебя принимают полностью, без осуждения. Для меня это важно.`,
        author: "Елена, 46 лет"
    }
];

