import NotebookTiny from '@/assets/images/account/notebook-tiny.webp';
import Notebook from '@/assets/images/account/notebook.webp';
import Staple from '@/assets/images/account/stampes.webp';
import StapleTiny from '@/assets/images/account/stampes-tiny.webp';
import Pen from '@/assets/images/account/pen.webp';
import TinyPen from '@/assets/images/account/pen-tiny.webp';
import ProfileBackground from '@/components/account/atoms/profile-background';
import AccountLayout from '@/layouts/user/account-layout';
import { cn } from '@/lib/utils';

import ArtLayer from '@/components/user/atoms/art-layer';
import ProfileInfo from '@/components/user/organisms/account/profile-info';
import ProfilePassword from '@/components/user/organisms/account/profile-password';

export default function Profile() {
    return (
        <AccountLayout
            layoutClass="text-text-black bg-main-page-bg"
            pageClass="px-4 pb-18 sm:px-11 sm:pb-26 xl:pb-33.5 2xl:pb-30 2xl:px-25 3xl:px-40 overflow-visible"
        >
            <ProfileBackground />

            <ArtLayer
                img={Notebook}
                tinyImg={NotebookTiny}
                className="hidden -top-10 -right-10 xl:top-0 xl:right-0 lg:block"
            />

            <ArtLayer
                img={Staple}
                tinyImg={StapleTiny}
                className="hidden bottom-120 left-0 xl:block"
            />
            <ArtLayer
                img={Pen}
                tinyImg={TinyPen}
                className="hidden bottom-120 left-40 xl:block"
            />
            <h1
                className={cn(
                    'relative z-20 -mx-3 mt-10 mb-4 block sm:mt-16 sm:mb-8 lg:mt-25 lg:mb-10',
                )}
            >
                <span
                    className={cn(
                        'mx-auto mt-2 block w-fit overflow-hidden px-3 text-center font-heading text-xl sm:text-3xl md:mt-4 md:text-4xl xl:mt-5 xl:text-5xl',
                    )}
                >
                    Редактировать профиль
                </span>
            </h1>

            <ProfileInfo />

            <ProfilePassword />

        </AccountLayout>
    );
}
