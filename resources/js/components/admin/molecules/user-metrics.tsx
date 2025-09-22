import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export type UserMetricsProps = {
    id: string;
    icon: string;
    title: string;
    diff: number;
    quantity: number;
};

export default function UserMetrics({ icon, title, diff, quantity }: UserMetricsProps) {
    return (
        <li className="rounded-3xl border border-pale-swamp bg-mute-white px-5 py-6">
            <h4 className="mb-3 font-semibold text-sm 2xl:text-base">{title}</h4>

            <div className="mb-2 flex items-center justify-between gap-4">
                <figure
                    aria-hidden="true"
                    className="rounded-md bg-bright-salad p-2.5"
                >
                    <img
                        src={icon}
                        alt=""
                        className="size-6"
                    />
                </figure>
                <span className="mr-auto font-semibold">{quantity}</span>
                <span className="flex items-center gap-1 text-sm font-semibold">
                    <ArrowUp
                        className={cn(
                            'size-5',
                            diff >= 0
                                ? 'text-bright-salad'
                                : 'rotate-180 text-red-700',
                        )}
                    />
                    {Math.abs(diff)}
                </span>
            </div>

            <span className="block text-right text-xs font-medium text-slate-700">
                За последние 14 дней
            </span>
        </li>
    );
}
