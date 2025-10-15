import { CardData } from '@/lib/data/card-data';
import { usePage } from '@inertiajs/react';
import InfoCard from '../atoms/info-card';
import SecondaryHeading from '../atoms/secondary-heading';
import SpanHighlight from '../atoms/span-highlight';

type EntryIntroProps = {
    title: string;
    entryKey: string;
    cards: CardData[];
    heading: string;
};

export default function EntryIntro({
    title,
    entryKey,
    cards,
    heading,
}: EntryIntroProps) {
    const { entries } = usePage<{
        entries: Record<string, string>;
    }>().props;

    const text = entries[entryKey] ?? '';

    return (
        <>
            <h3
                id={`${entryKey}-section-title`}
                className="relative z-11 mb-11 xl:mb-14"
            >
                <SpanHighlight
                    text={title}
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[8rem]"
                />
            </h3>

            <p className="relative z-11 mx-auto mb-17 block text-center text-sm font-semibold sm:text-base lg:max-w-3/4 2xl:text-xl">
                {text}
            </p>

            <ul
                className="relative z-11 mb-17 grid gap-11 sm:grid-cols-2 xl:grid-cols-4"
                role="list"
            >
                {cards.map((card) => (
                    <InfoCard
                        key={card.id}
                        html={card.text}
                        img={card.img}
                        alt={card.alt}
                    />
                ))}
            </ul>

            <SecondaryHeading
                text={`${heading}`}
                className="mb-17"
            />
        </>
    );
}
