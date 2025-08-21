import AccountBackground from '@/components/account/atoms/account-background';
import LazyImage from '@/components/user/atoms/lazy-image';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AccountLayout from '@/layouts/user/account-layout';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { Tier } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Account() {
    const { auth, tiers, purchased } = usePage<{
        tiers: Tier[];
        auth: Auth;
        purchased: number[];
    }>().props;

    return (
        <AccountLayout
            layoutClass="text-white bg-main-page-bg"
            pageClass="px-4 pb-18 sm:px-11 md:pb-16 xl:pb-23.5 2xl:pb-20 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <AccountBackground />

            <h1
                className={cn(
                    'relative z-20 -mx-3 mt-10 mb-4 block sm:mt-20 sm:mb-8 lg:mt-25 lg:mb-10',
                )}
            >
                <SpanHighlight
                    text="Личный кабинет"
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                />
                <span
                    className={cn(
                        'lx:mt-5 mx-auto mt-2 block w-fit overflow-hidden px-3 text-center font-heading text-xl md:mt-4 md:text-4xl xl:text-5xl',
                    )}
                >
                    {auth.user.name}, рады видеть вас на нашем сайте!
                </span>
            </h1>

            <div className="">
                <ul
                    className={cn(
                        'mx-auto space-y-24 mt-30 sm:mt-8 sm:space-y-6 w-fit lg:w-full lg:space-y-0 lg:grid lg:grid-cols-3',
                    )}
                >
                    {tiers.map((tier, idx) => (
                        <li key={tier.id}>
                            <TierCard
                                tier={tier}
                                purchased={! purchased.includes(tier.id)}
                                className={cn(
                                    idx !== 1 ? 'pt-28' : 'sm:gap-10',
                                )}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </AccountLayout>
    );
}

type TierCardProps = {
    tier: Tier;
    className?: string;
    purchased: boolean;
};

function TierCard({ tier, className, purchased }: TierCardProps) {
    return (
        <article
            className={cn(
                'max-w-85 rounded-[3rem] border-2 border-white/20 bg-card-backdrop-gray/50 px-9 pt-22 pb-8 backdrop-blur-sm sm:flex sm:max-w-182 sm:items-center sm:gap-4 sm:px-6 sm:py-11 md:px-8 xl:max-w-full xl:px-10',
                className,
                !purchased && 'grayscale',
            )}
        >
            {tier.image && (
                <LazyImage
                    img={tier.image.path}
                    tinyImg={tier.image.tiny_path}
                    alt={tier.image.alt}
                    parentClass="absolute -top-24 left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 w-48 mb-4 sm:w-60 sm:shrink-0 sm:mx-0"
                    imgClass="object-contain"
                />
            )}

            <div className="">
                <header>
                    <h2 className="mb-4 text-center font-heading text-4xl sm:text-left sm:text-5xl md:mb-7 lg:text-6xl">
                        {tier.name}
                    </h2>
                </header>

                <p className="mb-5 text-center text-sm text-balance sm:text-left sm:text-base md:mb-8 2xl:text-lg">
                    {tier.description}
                </p>
            </div>
        </article>
    );
}
