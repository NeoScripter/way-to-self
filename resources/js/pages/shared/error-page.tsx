import Logo from "@/components/user/atoms/logo";
import PrimaryBtn from "@/components/user/atoms/primary-btn";
import { cn } from "@/lib/utils";
import ErrorPageBg from "@/assets/images/shared/404.webp";
import ErrorPageBgTablet from "@/assets/images/shared/404-tablet.webp";
import useMediaQuery from "@/hooks/use-media-query";

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

    const bgImage = isLarge ? ErrorPageBg : ErrorPageBgTablet;

    return (
        <div className="min-h-screen relative z-5 bg-main-page-bg bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})`}}>
            <header className={cn("flex backdrop-blur-lg bg-black/50 items-center justify-between gap-x-5 text-white px-7 md:px-0 md:mx-7 lg:mx-14 xl:ml-27 xl:mr-23 2xl:ml-41 2xl:mr-28")}>

                <div aria-hidden="true" className={cn("absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen -z-10")}></div>

                <Logo className="text-4xl sm:text-6xl mt-2.5 sm:mt-5 sm:mb-4 md:mt-7 md:mb-5 mb-2 ml-1 md:text-4xl lg:text-6xl" />

                <PrimaryBtn className="mx-auto text-xs shrink-0 xl:text-base md:mr-0 md:order-2" href="/">Личный кабинет</PrimaryBtn>

            </header>

            <h1>{title}</h1>
            <div>{description}</div>
        </div>
    )
}
