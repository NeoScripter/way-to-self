import Logo from "@/components/user/atoms/logo";
import PrimaryBtn from "@/components/user/atoms/primary-btn";
import { cn } from "@/lib/utils";
import LargeBg from "@/assets/images/shared/404-desktop.webp";
import TinyLargeBg from "@/assets/images/shared/404-desktop-tiny.webp";
import MobileBg from "@/assets/images/shared/404-tablet.webp";
import TinyMobileBg from "@/assets/images/shared/404-tablet-tiny.webp";
import useMediaQuery from "@/hooks/use-media-query";
import LazyImage from "@/components/user/atoms/lazy-image";
import RepairSVG from "@/assets/svgs/503.svg";

type ErrorPageProps = {
    status: number;
}

type ErrorConfig = {
    code: string;
    title: string;
    description: string;
};

const ERROR_MESSAGES: Record<number, ErrorConfig> = {
    503: {
        code: '503',
        title: 'Техническое обслуживание',
        description: 'В данный момент страница находится в разработке'
    },
    500: {
        code: '500',
        title: 'Ошибка сервера',
        description: 'Ошибка сервера'
    },
    404: {
        code: '404',
        title: 'Страница не найдена',
        description: 'страница не найдена'
    },
    403: {
        code: '403',
        title: 'Доступ запрещен',
        description: 'доступ закрыт'
    }
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const errorConfig = ERROR_MESSAGES[status] || ERROR_MESSAGES[404];
    const isMaintenanceMode = status === 503;

    const backgroundImage = isDesktop ? LargeBg : MobileBg;
    const placeholderImage = isDesktop ? TinyLargeBg : TinyMobileBg;

    const renderMaintenanceContent = () => (
        <div className="md:pt-7 pb-5">
            <h1 className="text-[5.5vw] leading-[1em] font-heading md:text-5xl text-balance max-w-4/5 md:max-w-7/10 mx-auto mb-[0.8em]">
                {errorConfig.description}
            </h1>

            <div
                aria-hidden="true"
                className="w-full h-[40vw] md:h-90"
                role="img"
                aria-label="Иллюстрация технического обслуживания"
            >
                <img
                    src={RepairSVG}
                    alt=""
                    className="size-full object-bottom object-cover"
                />
            </div>
        </div>
    );

    const renderStandardErrorContent = () => (
        <div className="px-7 pb-10 sm:p-13 sm:pb-20">
            <h1 className="uppercase leading-[1.2em] text-[11vw] md:text-[6rem]">
                Ошибка
            </h1>

            <div
                className="uppercase text-[30vw] font-bold leading-[1em] md:text-[16rem]"
                aria-label={`Код ошибки ${errorConfig.code}`}
            >
                {errorConfig.code}
            </div>

            <p className="text-[5.5vw] leading-[1em] md:text-5xl">
                {errorConfig.description}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col relative gap-4 z-5 bg-main-page-bg">
            {/* Header */}
            <header className={cn(
                "flex shrink-0 bg-black/40 items-center justify-between relative z-20",
                "gap-x-5 text-white p-4 sm:py-0 md:px-7 lg:px-14 xl:px-27"
            )}>
                <Logo
                    className="text-3xl sm:text-5xl mt-2.5 sm:mt-5 sm:mb-4 md:mt-7 md:mb-5 mb-2 ml-1 md:text-6xl"
                    aria-label="Логотип компании"
                />
                <PrimaryBtn
                    className="text-xs shrink-0 md:text-base xl:text-lg"
                    href="/"
                    aria-label="Перейти в личный кабинет"
                >
                    Личный кабинет
                </PrimaryBtn>
            </header>

            {/* Background Image */}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-15 pointer-events-none"
                role="presentation"
            >
                <LazyImage
                    img={backgroundImage}
                    alt=""
                    tinyImg={placeholderImage}
                    imgClass="md:object-top"
                    parentClass="size-full"
                />
            </div>

            {/* Main Content */}
            <main
                className="flex-1 flex items-center justify-center h-full"
                role="main"
                aria-live="polite"
            >
                <article className={cn(
                    "bg-white relative mb-30 z-10 rounded-4xl md:rounded-[5rem]",
                    "pt-10 text-center w-4/5 max-w-178 text-dark-green font-heading"
                )}>
                    {isMaintenanceMode ? renderMaintenanceContent() : renderStandardErrorContent()}

                    <PrimaryBtn
                        className={cn(
                            "absolute z-30 px-[2em] uppercase -bottom-[1.6em] left-1/2 -translate-x-1/2",
                            "text-[3vw] font-bold shadow-md shrink-0 md:text-lg"
                        )}
                        href="/"
                        aria-label="Вернуться на главную страницу"
                    >
                        На главную
                    </PrimaryBtn>
                </article>
            </main>
        </div>
    );
}
