import ExampleTrack from "@/assets/audio/output.mp3"
import ExamplePreview from "@/assets/images/home/example-meditation.webp";
import ExamplePreview2 from "@/assets/images/home/exercise-1.webp";
import SpanHighlight from "../../atoms/span-highlight";
import InfoCard from "../../atoms/info-card";
import SecondaryHeading from "../../atoms/secondary-heading";
import { soulCardData } from "@/lib/data/card-data";
import AudioPlayer, { Track } from "../../atoms/audio-player";

export default function SoulSection() {
    return (
        <>
            <h3 id="soul-section-title" className="mb-11 xl:mb-14">
                <SpanHighlight
                    text='Раздел &quot;Душа&quot;'
                    className="text-white text-[4rem] sm:text-[8rem] mx-auto mt-[0.1em]"
                />
            </h3>

            <p className="block mb-17 mx-auto text-sm text-center font-semibold sm:text-base lg:max-w-3/4 2xl:text-xl">
                Иногда все, что нам нужно — это остановиться. Подышать. Услышать себя. Этот раздел создан, чтобы вернуть вам тишину внутри и помочь справляться с тревогой, усталостью и внутренней суетой. Здесь вы найдете медитации, дыхательные практики, короткие аудио и простые техники, которые можно использовать даже в течение дня — на ходу, в перерывах, перед сном. Ниже можно ознакомиться с примером медитации.
            </p>

            <ul className="mb-17 relative z-11 grid gap-11 sm:grid-cols-2 xl:grid-cols-4" role="list">
                {soulCardData.map(card => (
                    <InfoCard html={card.text} key={card.id} img={card.img} alt={card.alt} />
                ))}
            </ul>

            <SecondaryHeading text="Пример медитации" className="mb-17" />

            <AudioPlayer className="relative z-11" tracks={tracks} />
        </>
    );
}

const tracks: Track[] = [
    {
        title: "Название медитации",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur ",
        audioSrc: ExampleTrack,
        image: ExamplePreview,
    },
    {
        title: "Название 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptate aspernatur, soluta nemo qui quas?Lorem ipsum dolor sit amet consectetur ",
        audioSrc: ExampleTrack,
        image: ExamplePreview2,
    }
];

