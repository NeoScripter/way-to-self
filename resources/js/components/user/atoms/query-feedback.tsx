import Svg from '@/assets/svgs/no-items.svg';
import { cn } from '@/lib/utils';

type QueryFeedbackProps = {
    className?: string;
    status?: string;
};

export default function QueryFeedback({
    className,
    status = 'empty',
}: QueryFeedbackProps) {
    const message =
        status === 'error'
            ? 'К сожалению, произошла непредвиденная ошибка'
            : 'По вашему запросу ничего не найдено';

    return (
        <div
            className={cn(
                'mx-auto flex w-fit flex-col items-center gap-4 rounded-4xl border-2 border-white/20 bg-card-backdrop-gray/50 p-2 px-9 py-7 text-white backdrop-blur-sm sm:flex-row sm:gap-7',
                className,
            )}
        >
            <div className="h-14 w-17.5 shrink-0">
                <img
                    src={Svg}
                    aria-hidden="true"
                    alt=""
                    className="size-full object-contain object-center"
                />
            </div>
            <p className="text-center text-balance sm:text-left sm:text-xl">
                {message}
            </p>
        </div>
    );
}
