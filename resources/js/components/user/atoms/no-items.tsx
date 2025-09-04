import Svg from '@/assets/svgs/no-items.svg';
import { cn } from '@/lib/utils';

type NoItemsProps = {
    className?: string;
};

export default function NoItems({ className }: NoItemsProps) {
    return (
        <div
            className={cn(
                'flex items-center flex-col sm:flex-row w-fit mx-auto gap-7 rounded-4xl border-2 border-white/20 bg-card-backdrop-gray/50 p-2 px-9 py-7 text-white backdrop-blur-sm',
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
            <p className="text-xl text-center sm:text-left">По вашему запросу ничего не найдено</p>
        </div>
    );
}
