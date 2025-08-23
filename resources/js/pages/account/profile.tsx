import ProfileBackground from '@/components/account/atoms/profile-background';
import AccountLayout from '@/layouts/user/account-layout';
import { cn } from '@/lib/utils';

import ProfileInfo from '@/components/user/organisms/account/profile-info';


export default function Profile() {
    return (
        <AccountLayout
            layoutClass="text-text-black bg-main-page-bg"
            pageClass="px-4 pb-18 sm:px-11 md:pb-16 xl:pb-23.5 2xl:pb-20 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <ProfileBackground />

            <h1
                className={cn(
                    'relative z-20 -mx-3 mt-10 mb-4 block sm:mt-20 sm:mb-8 lg:mt-25 lg:mb-10',
                )}
            >
                <span
                    className={cn(
                        'lx:mt-5 mx-auto mt-2 block w-fit overflow-hidden px-3 text-center font-heading text-xl md:mt-4 md:text-4xl xl:text-5xl',
                    )}
                >
                    Редактировать профиль
                </span>
            </h1>

            <ProfileInfo />

        </AccountLayout>
    );
}

