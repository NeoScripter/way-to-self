import AccountBackground from '@/components/account/atoms/account-background';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AccountLayout from '@/layouts/user/account-layout';
import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Account() {
    const { auth } = usePage<{ auth: Auth }>().props;

    return (
        <AccountLayout
            layoutClass="text-white bg-main-page-bg"
            pageClass="px-4 pb-18 sm:px-11 md:pb-16 xl:pb-23.5 2xl:pb-20 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <AccountBackground />

            <h1
                className={cn(
                    'relative z-20 -mx-3 mt-8 mb-4 block sm:mt-20 sm:mb-8 lg:mt-25 lg:mb-10',
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

            <div className="">This is the account page</div>
        </AccountLayout>
    );
}
