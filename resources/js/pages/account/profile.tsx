import TinyMobileBg from '@/assets/images/account/account-settings-bg-mobile-tiny.webp';
import MobileBg from '@/assets/images/account/account-settings-bg-mobile.webp';
import TinyDesktopBg from '@/assets/images/account/account-settings-bg-tiny.webp';
import DesktopBg from '@/assets/images/account/account-settings-bg.webp';
import NotebookTiny from '@/assets/images/account/notebook-tiny.webp';
import Notebook from '@/assets/images/account/notebook.webp';
import TinyPen from '@/assets/images/account/pen-tiny.webp';
import Pen from '@/assets/images/account/pen.webp';
import StapleTiny from '@/assets/images/account/stampes-tiny.webp';
import Staple from '@/assets/images/account/stampes.webp';
import ProfileInfo from '@/components/account/organisms/profile-info';
import ProfilePassword from '@/components/account/organisms/profile-password';
import BgImage from '@/components/shared/atoms/bg-image';
import ArtLayer from '@/components/user/atoms/art-layer';
import AppLayout from '@/layouts/user/app-layout';
import { cn } from '@/lib/utils';

export default function Profile() {
    return (
        <AppLayout
            variant="account"
            layoutClass="text-text-black bg-main-page-bg"
            pageClass="px-4 pb-18 sm:px-11 sm:pb-26 xl:pb-33.5 2xl:pb-30 2xl:px-25 3xl:px-40"
        >
            <BgImage
                desktopPath={DesktopBg}
                desktopTinyPath={TinyDesktopBg}
                mobilePath={MobileBg}
                mobileTinyPath={TinyMobileBg}
                pictureClass="size-full object-cover object-center"
                imageClass="size-full object-cover object-left-top"
            />

            <ArtLayer
                img={Notebook}
                tinyImg={NotebookTiny}
                className="-top-10 -right-10 hidden lg:block xl:top-0 xl:right-0"
            />

            <ArtLayer
                img={Staple}
                tinyImg={StapleTiny}
                className="bottom-120 left-0 hidden xl:block"
            />
            <ArtLayer
                img={Pen}
                tinyImg={TinyPen}
                className="bottom-120 left-40 hidden xl:block"
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
        </AppLayout>
    );
}
