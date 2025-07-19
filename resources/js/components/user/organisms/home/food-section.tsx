import SpanHighlight from "../../atoms/span-highlight";
import FoodCard1 from "@/assets/images/home/food-card-1.webp";
import FoodCard2 from "@/assets/images/home/food-card-2.webp";
import FoodCard3 from "@/assets/images/home/food-card-3.webp";
import FoodCard4 from "@/assets/images/home/food-card-4.webp";
import InfoCard from "../../atoms/info-card";

export default function FoodSection() {
    return (
        <>
            <h3 id="nutrition-section-title" className="mb-11 xl:mb-14">
                <SpanHighlight
                    text='Раздел "Питание"'
                    className="text-white text-[4rem] sm:text-[8rem] mx-auto mt-[0.1em]"
                />
            </h3>

            <p className="block mb-17 mx-auto text-sm text-center font-semibold sm:text-base lg:max-w-3/4 2xl:text-xl">
                Питание — это не про ограничения. Это про поддержку, энергию и уважение к себе. В этом разделе вы найдете рецепты, которые не требуют часов у плиты, рекомендации, которые легко встроить в реальную жизнь, и главное — подход без вины и диет. Здесь нет запретов, подсчёта калорий и жёстких рамок. Только осознанный выбор, гибкость и возможность слушать своё тело, а не следовать чужим правилам. Раздел постоянно пополняется.
            </p>

            <ul className="grid gap-11 sm:grid-cols-2 xl:grid-cols-4" role="list">
                {foodCardData.map(card => (
                    <InfoCard key={card.id} img={card.img} alt={card.alt}>
                        {card.text}
                    </InfoCard>
                ))}
            </ul>
        </>
    );
}

type FoodCardData = {
    id: string;
    text: React.ReactNode;
    img: string;
    alt: string;
}

export const foodCardData: FoodCardData[] = [
    {
        id: "recipes-daily",
        text: (
            <p>
                Сбалансированные <span className="info-card__large">Рецепты</span>{" "}
                <span className="info-card__right">на каждый день</span>
            </p>
        ),
        img: FoodCard1,
        alt: "Тарелка с ярким овощным салатом: авокадо, нут, помидоры черри, сладкий картофель, капуста и зелень"
    },
    {
        id: "meal-planning-tips",
        text: (
            <p>
                <span className="info-card__indent">Подсказки по составлению</span>{" "}
                <span className="info-card__large">Рациона</span>
            </p>
        ),
        img: FoodCard2,
        alt: "Два зелёных стакана с фруктовым смузи и летящими кусочками фруктов: арбуз, апельсин, банан и огурец"
    },
    {
        id: "faq-answers",
        text: (
            <p>
                <span className="info-card__large">Ответы</span> на популярные вопросы
            </p>
        ),
        img: FoodCard3,
        alt: "Рука, держащая белый вопросительный знак на зелёном фоне"
    },
    {
        id: "telegram-chat",
        text: (
            <p>
                Секретный чат в <span className="info-card__large">Телеграм</span>
            </p>
        ),
        img: FoodCard4,
        alt: "Радостная девушка в жёлтой футболке и джинсовом комбинезоне смотрит в телефон и поднимает кулак вверх"
    }
];
