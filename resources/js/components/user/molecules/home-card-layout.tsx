import scrollTo from '@/lib/helpers/scrollTo';
import { cn } from '@/lib/utils';
import SecondaryBtn from '../atoms/secondary-btn';

type HomeCardLayoutProps = {
    children: React.ReactNode;
    ariaLabel: string;
    ariaDesc: string;
    className?: string;
    contentClassName?: string;
    sectionNameEng: string;
    sectionNameRus: string;
    btnAriaLabel: string;
    description: string;
};

export default function HomeCardLayout({
    children,
    description,
    contentClassName,
    ariaDesc,
    ariaLabel,
    className,
    sectionNameEng,
    sectionNameRus,
    btnAriaLabel,
}: HomeCardLayoutProps) {
    return (
        <article
            className={cn(
                'relative mb-28 rounded-[6rem] border-2 border-white/20 bg-card-backdrop-gray/50 px-9 pb-8 backdrop-blur-sm sm:mb-9 sm:w-full sm:px-10 sm:py-11 lg:mb-18 lg:px-15.5 lg:py-8.5 xl:mb-14 2xl:px-17.5 2xl:pb-14',
                className,
            )}
            aria-labelledby={ariaLabel}
            aria-describedby={ariaDesc}
        >
            {children}

            <div className={contentClassName}>
                <header>
                    <h2
                        id={ariaLabel}
                        className="mb-4 text-center font-heading text-4xl sm:text-5xl md:mb-7 md:text-6xl"
                    >
                        {sectionNameRus}
                    </h2>
                </header>

                <p
                    id={`${sectionNameEng}-section-description`}
                    className="mb-5 text-center text-sm text-balance sm:text-base md:mb-8 2xl:text-xl"
                >
                    {description}
                </p>

                <SecondaryBtn
                    onClick={() => scrollTo(`#${sectionNameEng}-section-title`)}
                    className="mx-auto text-sm sm:text-base 2xl:text-xl"
                    aria-label={btnAriaLabel}
                >
                    Подробнее
                </SecondaryBtn>
            </div>
        </article>
    );
}
