import TinyLargeBg from '@/assets/images/shared/404-desktop-tiny.webp';
import LargeBg from '@/assets/images/shared/404-desktop.webp';
import TinyMobileBg from '@/assets/images/shared/404-tablet-tiny.webp';
import MobileBg from '@/assets/images/shared/404-tablet.webp';
import RepairSVG from '@/assets/svgs/503.svg';
import LazyImage from '@/components/user/atoms/lazy-image';
import Logo from '@/components/user/atoms/logo';
import PrimaryBtn from '@/components/user/atoms/primary-btn';
import useMediaQuery from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

type ErrorPageProps = {
    status: number;
};

type ErrorConfig = {
    code: string;
    title: string;
    description: string;
};

const ERROR_MESSAGES: Record<number, ErrorConfig> = {
    503: {
        code: '503',
        title: 'Техническое обслуживание',
        description: 'В данный момент страница находится в разработке',
    },
    500: {
        code: '500',
        title: 'Ошибка сервера',
        description: 'Ошибка сервера',
    },
    404: {
        code: '404',
        title: 'Страница не найдена',
        description: 'страница не найдена',
    },
    403: {
        code: '403',
        title: 'Доступ запрещен',
        description: 'доступ закрыт',
    },
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const errorConfig = ERROR_MESSAGES[status] || ERROR_MESSAGES[404];
    const isMaintenanceMode = status === 503;

    const backgroundImage = isDesktop ? LargeBg : MobileBg;
    const placeholderImage = isDesktop ? TinyLargeBg : TinyMobileBg;

    const renderMaintenanceContent = () => (
        <div className="pb-5 md:pt-7">
            <h1 className="mx-auto mb-[0.8em] max-w-4/5 font-heading text-[5.5vw] leading-[1em] text-balance md:max-w-7/10 md:text-5xl">
                {errorConfig.description}
            </h1>

            <div
                aria-hidden="true"
                className="h-[40vw] w-full md:h-90"
                role="img"
                aria-label="Иллюстрация технического обслуживания"
            >
                <img
                    src={RepairSVG}
                    alt=""
                    className="size-full object-cover object-bottom"
                />
            </div>
        </div>
    );

    const renderStandardErrorContent = () => (
        <div className="px-7 pb-10 sm:p-13 sm:pb-20">
            <h1 className="text-[11vw] leading-[1.2em] uppercase md:text-[6rem]">
                Ошибка
            </h1>

            <div
                className="text-[30vw] leading-[1em] font-bold uppercase md:text-[16rem]"
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
        <div className="relative z-5 flex min-h-screen flex-col gap-4 bg-main-page-bg">
            {/* Header */}
            <header
                className={cn(
                    'relative z-20 flex shrink-0 items-center justify-between bg-black/40',
                    'gap-x-5 p-4 text-white sm:py-0 md:px-7 lg:px-14 xl:px-27',
                )}
            >
                <Logo
                    className="mt-2.5 mb-2 ml-1 text-3xl sm:mt-5 sm:mb-4 sm:text-5xl md:mt-7 md:mb-5 md:text-6xl"
                    aria-label="Логотип компании"
                />
                <PrimaryBtn
                    className="shrink-0 text-xs md:text-base xl:text-lg"
                    href="/"
                    aria-label="Перейти в личный кабинет"
                >
                    Личный кабинет
                </PrimaryBtn>
            </header>

            {/* Background Image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-15"
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
                className="flex h-full flex-1 items-center justify-center"
                role="main"
                aria-live="polite"
            >
                <article
                    className={cn(
                        'relative z-10 mb-30 rounded-4xl bg-white md:rounded-[5rem]',
                        'w-4/5 max-w-178 pt-10 text-center font-heading text-dark-green',
                    )}
                >
                    {isMaintenanceMode
                        ? renderMaintenanceContent()
                        : renderStandardErrorContent()}

                    <PrimaryBtn
                        className={cn(
                            'absolute -bottom-[1.6em] left-1/2 z-30 -translate-x-1/2 px-[2em] uppercase',
                            'shrink-0 text-[3vw] font-bold shadow-md md:text-lg',
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
