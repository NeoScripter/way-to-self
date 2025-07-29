import Logo from "@/components/user/atoms/logo";
import PrimaryBtn from "@/components/user/atoms/primary-btn";
import { cn } from "@/lib/utils";
import LargeBg from "@/assets/images/shared/404.webp";
import TinyLargeBg from "@/assets/images/shared/404-tiny.webp";
import MobileBg from "@/assets/images/shared/404-tablet.webp";
import TinyMobileBg from "@/assets/images/shared/404-tablet-tiny.webp";
import useMediaQuery from "@/hooks/use-media-query";
import LazyImage from "@/components/user/atoms/lazy-image";

type ErrorPageProps = {
    status: string;
}

export default function ErrorPage({ status }: ErrorPageProps) {
    const isLarge = useMediaQuery('(min-width: 768px)');

    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    const largeImg = isLarge ? LargeBg : MobileBg;
    const tinyImg = isLarge ? TinyLargeBg : TinyMobileBg;

    return (
        <div className="min-h-screen flex flex-col relative gap-4 z-5 bg-main-page-bg">

            <header className={cn("flex shrink-0 bg-black/40 items-center justify-between relative z-20 gap-x-5 text-white p-4 sm:py-0 md:px-7 lg:px-14 xl:px-27")}>
                <Logo className="text-3xl sm:text-5xl mt-2.5 sm:mt-5 sm:mb-4 md:mt-7 md:mb-5 mb-2 ml-1 md:text-6xl" />

                <PrimaryBtn className="text-xs shrink-0 md:text-base xl:text-lg" href="/">Личный кабинет</PrimaryBtn>

            </header>

            <div
                aria-hidden="true"
                className="absolute inset-0 z-15 pointer-events-none"
            >
                <LazyImage
                    img={largeImg}
                    alt=""
                    tinyImg={tinyImg}
                    imgClass="md:object-top"
                    parentClass="size-full"
                />
            </div>


            <main className="flex-1 flex items-center justify-center h-full">
                <article className="bg-white relative mb-30 z-10 rounded-4xl md:rounded-[5rem] px-7 py-10 sm:p-13 text-center w-4/5 max-w-178 text-dark-green font-heading">

                    <h1 className="uppercase leading-[1.2em] text-[11vw] md:text-[6rem]">Ошибка</h1>
                    <p className="uppercase text-[30vw] font-bold leading-[1em] md:text-[16rem]">404</p>
                    <div className="text-[5.5vw] leading-[1em] md:text-5xl">страница не найдена</div>
                    <PrimaryBtn className="absolute z-30 px-[2em] uppercase -bottom-[1.6em] left-1/2 -translate-x-1/2 text-[3vw] font-bold shadow-md shrink-0 md:text-lg" href="/">На главную</PrimaryBtn>
                </article>

            </main>
        </div>
    )
}
