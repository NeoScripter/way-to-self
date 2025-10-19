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
import BgImage from '@/components/shared/atoms/bg-image';
import ArtLayer from '@/components/user/atoms/art-layer';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { cn } from '@/lib/utils';

type LegalInfoProps = {
    title: string;
    html: string;
};

export default function LegalInfo({ title, html }: LegalInfoProps) {
    return (
        <AppLayout
            variant="guest"
            layoutClass="text-text-black bg-main-page-bg"
            pageClass="px-4 pb-18 sm:px-11 sm:pb-26 xl:pb-33.5 2xl:pb-30 2xl:px-25 3xl:px-40"
            headerClass="bg-account-header-bg/70"
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
                className="bottom-1/2 left-0 hidden xl:block"
            />
            <ArtLayer
                img={Pen}
                tinyImg={TinyPen}
                className="right-0 bottom-120 hidden xl:block"
            />
            <h1
                className={cn(
                    'relative z-20 -mx-3 mt-10 mb-4 flex flex-wrap justify-center sm:mt-16 sm:mb-8 lg:mt-25 lg:mb-10',
                )}
            >
                {title.split(' ').map((word, idx) => (
                    <SpanHighlight
                        key={`titile-${idx}`}
                        text={word}
                        className="mt-[0.1em] text-[4rem] text-white sm:text-[8rem]"
                    />
                ))}
            </h1>

            <div
                className="sm:prose-md relative z-20 my-3 prose prose-sm block max-w-full text-black lg:prose-lg lg:mt-5 2xl:prose-xl"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </AppLayout>
    );
}
