import { cn } from '@/lib/utils';

export type TierMetricsProps = {
    id: string;
    title: string;
    sections: MetricsSectionProps[];
    className?: string;
};

export default function TierMetrics({
    className,
    title,
    sections,
}: TierMetricsProps) {
    return (
        <div
            className={cn(
                'rounded-3xl border border-pale-swamp bg-mute-white px-5 py-6',
                className,
            )}
        >
            <h4 className="mb-3 rounded-xl border border-bright-salad bg-white px-3 py-2 text-xl font-semibold">
                {title}
            </h4>
            <div className="divide-y divide-bright-salad px-2">
                {sections.map((section) => (
                    <MetricsSection
                        key={section.id}
                        {...section}
                    />
                ))}
            </div>
        </div>
    );
}

export type MetricsSectionProps = {
    id: string;
    fields: MetricItemProps[];
};

function MetricsSection({ fields }: MetricsSectionProps) {
    return (
        <div className="space-y-4 py-4">
            {fields.map((field) => (
                <MetricItem
                    key={field.id}
                    {...field}
                />
            ))}
        </div>
    );
}

export type MetricItemProps = {
    id: string;
    label: string;
    value: number;
    isHighlighted: boolean;
};

function MetricItem({ label, value, isHighlighted }: MetricItemProps) {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-semibold">{label}</div>
            <div
                className={cn(
                    'flex min-w-16 items-center justify-center rounded-sm p-2 text-sm font-medium',
                    isHighlighted
                        ? 'bg-bright-salad text-white'
                        : 'bg-transparent-gray text-black',
                )}
            >
                {value}
            </div>
        </div>
    );
}
