import FoodCard1 from "@/assets/images/home/food-card-1.webp";
import FoodCard2 from "@/assets/images/home/food-card-2.webp";
import FoodCard3 from "@/assets/images/home/food-card-3.webp";
import FoodCard4 from "@/assets/images/home/food-card-4.webp";

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

