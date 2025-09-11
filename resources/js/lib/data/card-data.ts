import BodyCard1 from '@/assets/images/home/body-card-1.webp';
import BodyCard2 from '@/assets/images/home/body-card-2.webp';
import BodyCard3 from '@/assets/images/home/body-card-3.webp';
import BodyCard4 from '@/assets/images/home/body-card-4.webp';
import FoodCard1 from '@/assets/images/home/food-card-1.webp';
import FoodCard2 from '@/assets/images/home/food-card-2.webp';
import FoodCard3 from '@/assets/images/home/food-card-3.webp';
import FoodCard4 from '@/assets/images/home/food-card-4.webp';
import SoulCard1 from '@/assets/images/home/soul-card-1.webp';
import SoulCard2 from '@/assets/images/home/soul-card-2.webp';
import SoulCard3 from '@/assets/images/home/soul-card-3.webp';
import SoulCard4 from '@/assets/images/home/soul-card-4.webp';
import TinyBodyCard1 from '@/assets/images/home/body-card-1-tiny.webp';
import TinyBodyCard2 from '@/assets/images/home/body-card-2-tiny.webp';
import TinyBodyCard3 from '@/assets/images/home/body-card-3-tiny.webp';
import TinyBodyCard4 from '@/assets/images/home/body-card-4-tiny.webp';
import TinyFoodCard1 from '@/assets/images/home/food-card-1-tiny.webp';
import TinyFoodCard2 from '@/assets/images/home/food-card-2-tiny.webp';
import TinyFoodCard3 from '@/assets/images/home/food-card-3-tiny.webp';
import TinyFoodCard4 from '@/assets/images/home/food-card-4-tiny.webp';
import TinySoulCard1 from '@/assets/images/home/soul-card-1-tiny.webp';
import TinySoulCard2 from '@/assets/images/home/soul-card-2-tiny.webp';
import TinySoulCard3 from '@/assets/images/home/soul-card-3-tiny.webp';
import TinySoulCard4 from '@/assets/images/home/soul-card-4-tiny.webp';

import { v4 as uuidv4 } from 'uuid';

export type CardData = {
    id: string;
    text: string;
    img: string;
    tinyImg: string;
    alt: string;
};

export type AccountCard = {
    id: string;
    text: string;
    img: string;
    tinyImg: string;
    alt: string;
    route: string;
};

export const soulCardData: CardData[] = [
    {
        id: uuidv4(),
        text: `Аудио <span class="info-card__large info-card__medium">медитации</span> <span class="info-card__right">на 3–15 минут</span>`,
        img: SoulCard1,
        tinyImg: TinySoulCard1,
        alt: 'Женщина в зелёной рубашке с закрытыми глазами, выражающая спокойствие и сосредоточенность',
    },
    {
        id: uuidv4(),
        text: `<span class="info-card__large info-card__medium">Упражнения</span> <span style="font-size: 0.85rem;">для заземления, расслабления и концентрации</span>`,
        img: SoulCard2,
        tinyImg: TinySoulCard2,
        alt: 'Женщина в зелёном спортивном костюме медитирует в позе лотоса на фоне природы',
    },
    {
        id: uuidv4(),
        text: `Утренние и вечерние <span class="info-card__large">практики</span>`,
        img: SoulCard3,
        tinyImg: TinySoulCard3,
        alt: 'Силуэт женщины, медитирующей на воде на фоне заката и пагоды',
    },
    {
        id: uuidv4(),
        text: `<span class="info-card__large info-card__medium">Поддержка</span> в телеграм-чате`,
        img: SoulCard4,
        tinyImg: TinySoulCard4,
        alt: 'Рука держит смартфон на фоне размытых огней и зелёных украшений',
    },
];

export const foodCardData: CardData[] = [
    {
        id: 'recipes-daily',
        text: `Сбалансированные <span class="info-card__large">Рецепты</span> <span class="info-card__right">на каждый день</span>`,
        img: FoodCard1,
        tinyImg: TinyFoodCard1,
        alt: 'Тарелка с ярким овощным салатом: авокадо, нут, помидоры черри, сладкий картофель, капуста и зелень',
    },
    {
        id: 'meal-planning-tips',
        text: `<span class="info-card__indent">Подсказки по составлению</span> <span class="info-card__large">Рациона</span>`,
        img: FoodCard2,
        tinyImg: TinyFoodCard2,
        alt: 'Два зелёных стакана с фруктовым смузи и летящими кусочками фруктов: арбуз, апельсин, банан и огурец',
    },
    {
        id: 'faq-answers',
        text: `<span class="info-card__large">Ответы</span> на популярные вопросы`,
        img: FoodCard3,
        tinyImg: TinyFoodCard3,
        alt: 'Рука, держащая белый вопросительный знак на зелёном фоне',
    },
    {
        id: 'telegram-chat',
        text: `Секретный чат в <span class="info-card__large">Телеграм</span>`,
        img: FoodCard4,
        tinyImg: TinyFoodCard4,
        alt: 'Радостная девушка в жёлтой футболке и джинсовом комбинезоне смотрит в телефон и поднимает кулак вверх',
    },
];

export const bodyCardData: CardData[] = [
    {
        id: uuidv4(),
        text: `Мягкие силовые <span class="info-card__large info-card__medium">упражнения</span> <span class="info-card__right">и растяжки</span>`,
        img: BodyCard1,
        tinyImg: TinyBodyCard1,
        alt: 'Женщина в спортивной одежде делает выпады с гантелями в руках на коврике в гостиной',
    },
    {
        id: uuidv4(),
        text: `<span>Упражнения для </span> <span class="info-card__large info-card__medium">спины, </span><span>осанки и восстановления после сидячего рабочего дня</span>`,
        img: BodyCard2,
        tinyImg: TinyBodyCard2,
        alt: 'Девушка в спортивной одежде выполняет позу берёзка на полу возле кровати',
    },
    {
        id: uuidv4(),
        text: `Форматы на <span class="info-card__large info-card__medium">10-30 минут</span> легко встроить даже в самый плотный график`,
        img: BodyCard3,
        tinyImg: TinyBodyCard3,
        alt: 'Женщина в спортивной одежде делает растяжку на коврике перед ноутбуком',
    },
    {
        id: uuidv4(),
        text: `<span class="info-card__large info-card__medium">Программа</span> под ваше текущее состояние и цели`,
        img: BodyCard4,
        tinyImg: TinyBodyCard4,
        alt: 'Женский торс в белой одежде, обмотанный измерительной лентой для измерения талии',
    },
];

export const nutritionCardData: AccountCard[] = [
    {
        id: 'recipes-daily',
        text: `Сбалансированные <span class="info-card__large">Рецепты</span> <span class="info-card__right">на каждый день</span>`,
        img: FoodCard1,
        tinyImg: TinyFoodCard1,
        alt: 'Тарелка с ярким овощным салатом: авокадо, нут, помидоры черри, сладкий картофель, капуста и зелень',
        route: route('nutrition.recipes'),
    },
    {
        id: 'meal-planning-tips',
        text: `<span class="info-card__indent">Подсказки по составлению</span> <span class="info-card__large">Рациона</span>`,
        img: FoodCard2,
        tinyImg: TinyFoodCard2,
        alt: 'Два зелёных стакана с фруктовым смузи и летящими кусочками фруктов: арбуз, апельсин, банан и огурец',
        route: route('nutrition.articles'),
    },
    {
        id: 'telegram-chat',
        text: `Секретный чат в <span class="info-card__large">Телеграм</span>`,
        img: FoodCard4,
        tinyImg: TinyFoodCard4,
        alt: 'Радостная девушка в жёлтой футболке и джинсовом комбинезоне смотрит в телефон и поднимает кулак вверх',
        route: route('nutrition.index'),
    },
];

export const accountSoulCards: AccountCard[] = [
    {
        id: uuidv4(),
        text: `Аудио <span class="info-card__large info-card__account-large">медитации</span> <span class="info-card__right">на 3–15 минут</span>`,
        img: SoulCard1,
        tinyImg: TinySoulCard1,
        alt: 'Женщина в зелёной рубашке с закрытыми глазами, выражающая спокойствие и сосредоточенность',
        route: route('soul.audios'),
    },
    {
        id: uuidv4(),
        text: `Духовные <span class="info-card__large">практики</span>`,
        img: SoulCard3,
        tinyImg: TinySoulCard3,
        alt: 'Силуэт женщины, медитирующей на воде на фоне заката и пагоды',
        route: route('soul.practices'),
    },
    {
        id: uuidv4(),
        text: `<span class="info-card__large pb-4">Советы</span>`,
        img: SoulCard2,
        tinyImg: TinySoulCard2,
        alt: 'Женщина в зелёном спортивном костюме медитирует в позе лотоса на фоне природы',
        route: route('soul.articles'),
    },
    {
        id: uuidv4(),
        text: `<span class="info-card__large info-card__account-large">Поддержка</span> в телеграм-чате`,
        img: SoulCard4,
        tinyImg: TinySoulCard4,
        alt: 'Рука держит смартфон на фоне размытых огней и зелёных украшений',
        route: route('soul.index'),
    },
];
