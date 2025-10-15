import TinyDesktopBg from '@/assets/images/soul/account-soul-desktop-tiny.webp';
import DesktopBg from '@/assets/images/soul/account-soul-desktop.webp';
import TinyMobileBg from '@/assets/images/soul/account-soul-mobile-tiny.webp';
import MobileBg from '@/assets/images/soul/account-soul-mobile.webp';
import LinkCard from '@/components/account/atoms/link-card';
import BgImage from '@/components/shared/atoms/bg-image';
import FAQSection from '@/components/shared/organisms/faq-section';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { accountSoulCards } from '@/lib/data/card-data';
import { cn } from '@/lib/utils';

export default function Soul() {
    return (
        <AppLayout
            variant="tier"
            layoutClass="text-white bg-light-sand"
            pageClass="px-4 pb-20 space-y-21 sm:space-y-35 md:space-y-28 xl:space-y-34 sm:pb-24 xl:pb-30 sm:px-11 2xl:px-25 3xl:px-40"
        >
            <BgImage
                desktopPath={DesktopBg}
                desktopTinyPath={TinyDesktopBg}
                mobilePath={MobileBg}
                mobileTinyPath={TinyMobileBg}
            />

            <section>
                <h1
                    className={cn(
                        'relative z-20 -mx-3 mt-15 mb-5 block sm:mt-25 sm:mb-25 lg:mt-30 lg:mb-30',
                    )}
                >
                    <SpanHighlight
                        text='Раздел "Душа"'
                        className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                    />
                    <span
                        className={cn(
                            'mx-auto mt-5 block w-fit max-w-190 overflow-hidden px-3 text-center font-heading text-sm text-balance text-white sm:mt-8 sm:text-xl md:mt-10',
                        )}
                    >
                        Поздравляем вас с выбором блока "Душа" на нашем сайте.
                        Этот уникальный раздел создан для того, чтобы помочь вам
                        оздоровить психику, восстановить внутреннее равновесие и
                        обрести гармонию в жизни. Вы сделали важный шаг к своему
                        психическому здоровью и душевному спокойствию. Пусть
                        каждый материал и практика, представленные здесь,
                        наполнят вашу душу светом, теплом и позитивом. Помните,
                        что забота о себе — это залог счастливой и гармоничной
                        жизни. Желаем вам внутренней силы, спокойствия и радости
                        на пути к душевному благополучию!
                    </span>
                </h1>

                <ul
                    className="relative z-11 mx-auto mt-40 mb-31 grid w-fit justify-center gap-x-8 gap-y-31 sm:grid-cols-2 sm:gap-y-35 xl:grid-cols-4"
                    role="list"
                >
                    {accountSoulCards.map((card) => (
                        <LinkCard
                            html={card.text}
                            key={card.id}
                            img={card.img}
                            tinyImg={card.tinyImg}
                            alt={card.alt}
                            route={card.route}
                        />
                    ))}
                </ul>
            </section>

            <FAQSection short={true} />
        </AppLayout>
    );
}
