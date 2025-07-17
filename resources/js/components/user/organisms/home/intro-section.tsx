import PrimaryBtn from "../../atoms/primary-btn";
import SpanHighlight from "../../atoms/span-highlight";
import Intro from "@/assets/images/home/hero-4.webp";

export default function IntroSection() {
    return (
        <>
            <h3 className="mb-11">
                <SpanHighlight
                    text="Что внутри?"
                    className="text-[4rem] sm:text-[6rem] mx-auto mt-[0.1em] 2xl:text-[6rem]"
                />
            </h3>

            <div className="relative overflow-visible xl:flex">
                <div className="rounded-[6rem] border-2 border-white/20 backdrop-blur-sm bg-card-backdrop-gray/50 absolute inset-0 -z-1 top-1/5 sm:top-1/4 md:top-1/3 xl:top-0" aria-hidden="true"></div>

                <div className="xl:shrink-0 xl:h-full">
                    <img src={Intro} className="size-full object-contain" alt="Женщина с закрытыми глазами улыбается на фоне иконок, символизирующих медитацию, питание и физическую активность"/>
                </div>

                <div className="text-sm text-center text-balance px-6 pb-12 pt-10 sm:pb-14 sm:px-10 sm:pt-11.5 md:text-base 2xl:text-xl">
                    <div className="mb-8 space-y-6 sm:mb-12">
                        <p>
                            Мы часто думаем о здоровье как о чём-то одном: теле, питании или эмоциональном состоянии. Но всё связано. Этот проект — про целостность и баланс. Про то, как еда влияет на настроение, как тело откликается на стресс, и как тишина внутри помогает услышать свои настоящие потребности.
                        </p>
                        <p>
                            Этот ресурс создан, чтобы помочь наладить отношения с собой. Здесь нет универсальных схем и жёстких правил. Только мягкий, продуманный подход, который можно адаптировать под индивидуальный ритм жизни, цели и состояние.
                        </p>
                        <p>
                            Подписка даёт доступ к практикам, материалам и рекомендациям, которые помогут шаг за шагом выстраивать свою систему заботы — такую, которая работает именно для вас.
                        </p>
                        <p>
                            Все материалы разработаны дипломированным нутрициологом, с учётом реальных потребностей человека в балансе, а не в идеальности. Наши специалисты помогут выбрать фокус и собрать программу, которая будет приносить вам реальный результат без изнурительных диет и тренировок.
                        </p>
                    </div>

                    <PrimaryBtn className="border border-white mx-auto">
                        Получить доступ
                    </PrimaryBtn>
                </div>
            </div>
        </>
    );
}
