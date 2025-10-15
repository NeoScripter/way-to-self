import IntroTiny from '@/assets/images/home/home-intro-tiny.webp';
import Intro from '@/assets/images/home/home-intro.webp';
import CarrotBottom from '@/assets/images/home/veggies/bottom-carrot.webp';
import CarrotMiddle from '@/assets/images/home/veggies/middle-carrot.webp';
import CarrotTop from '@/assets/images/home/veggies/top-carrot.webp';
import LazyImage from '../atoms/lazy-image';
import PrimaryBtn from '../atoms/primary-btn';
import SpanHighlight from '../atoms/span-highlight';
import ArtLayer from '../atoms/art-layer';

export default function IntroSection() {
    return (
        <>
            <h3
                id="intro-heading"
                className="mb-11 xl:mb-14"
            >
                <SpanHighlight
                    text="Что внутри?"
                    className="mx-auto mt-[0.1em] text-[4rem] sm:text-[8rem]"
                />
            </h3>

            <div className="relative z-11 mx-auto max-w-162 overflow-visible xl:flex xl:max-w-full xl:justify-between">
                {/* Decorative backdrop */}
                <div
                    className="absolute inset-0 top-1/5 -z-1 rounded-[6rem] border-2 border-white/20 bg-card-backdrop-gray/50 backdrop-blur-sm sm:top-1/4 md:top-1/3 xl:top-0 xl:right-1/7"
                    aria-hidden="true"
                ></div>

                {/* Illustration */}
                <LazyImage
                    parentClass="lg:min-h-163 xl:shrink-0 !xl:h-full xl:order-2 xl:mb-0.5"
                    imgClass="size-full object-contain"
                    img={Intro}
                    alt="Женщина с закрытыми глазами улыбается на фоне иконок, символизирующих медитацию, питание и физическую активность"
                    tinyImg={IntroTiny}
                />

                {/* Description + CTA */}
                <div className="px-8 pt-10 pb-12 text-sm sm:px-12 sm:pt-11.5 sm:pb-14 sm:text-base xl:flex xl:flex-col xl:justify-between xl:pb-8 xl:pl-16 xl:text-left xl:text-base xl:text-[1.2vw] xl:text-wrap 2xl:pb-12 2xl:text-[1.1vw] 3xl:text-lg">
                    <div className="mb-8 space-y-6 sm:mb-12 xl:mb-8 xl:flex xl:flex-1 xl:flex-col xl:justify-between xl:gap-4 xl:space-y-0 3xl:mb-10">
                        <p>
                            Мы часто думаем о здоровье как о чём-то одном: теле,
                            питании или эмоциональном состоянии. Но всё связано.
                            Этот проект — про целостность и баланс. Про то, как
                            еда влияет на настроение, как тело откликается на
                            стресс, и как тишина внутри помогает услышать свои
                            настоящие потребности.
                        </p>
                        <p>
                            Этот ресурс создан, чтобы помочь наладить отношения
                            с собой. Здесь нет универсальных схем и жёстких
                            правил. Только мягкий, продуманный подход, который
                            можно адаптировать под индивидуальный ритм жизни,
                            цели и состояние.
                        </p>
                        <p>
                            Подписка даёт доступ к практикам, материалам и
                            рекомендациям, которые помогут шаг за шагом
                            выстраивать свою систему заботы — такую, которая
                            работает именно для вас.
                        </p>
                        <p>
                            Все материалы разработаны дипломированным
                            нутрициологом, с учётом реальных потребностей
                            человека в балансе, а не в идеальности. Наши
                            специалисты помогут выбрать фокус и собрать
                            программу, которая будет приносить вам реальный
                            результат без изнурительных диет и тренировок.
                        </p>
                    </div>

                    <PrimaryBtn
                        href={route('tiers.index')}
                        className="mx-auto border border-white"
                    >
                        Получить доступ
                    </PrimaryBtn>
                </div>
            </div>

            <ArtLayer
                img={CarrotTop}
                className="bottom-80 -left-10 w-3/5 max-w-100"
            />
            <ArtLayer
                img={CarrotMiddle}
                className="bottom-30 -left-20 w-3/5 max-w-120 sm:bottom-30 md:bottom-20"
            />
            <ArtLayer
                img={CarrotBottom}
                className="right-0 -bottom-30 w-62 sm:right-auto sm:left-0 lg:-bottom-50 lg:w-80"
            />
        </>
    );
}
